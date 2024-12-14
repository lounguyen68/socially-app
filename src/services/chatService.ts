import { apiCreateConversation } from '../api/createConversation.api';
import { apiCreateMessage } from '../api/createMessage.api';
import { apiGetConversationById } from '../api/getConversationById.api';
import { Conversation, Member } from '../api/getConversations.api';
import { Attachment } from '../api/getMessages.api';
import { apiUpdateMember } from '../api/updateMember.api';
import { ConversationType, MessageType, UploadType } from '../constants';
import { encryptMessage, generateDHKeys, generateSharedKey } from '../helpers';
import { messageV2 } from '../helpers/message.helper';
import { storageService } from './storageService';
import { uploadService } from './uploadService';

interface CreateMessage {
  content: string;
  type: MessageType;
  attachments?: Attachment[];
  conversationId: string;
  sender: Member;
  sharedKey?: string;
}

class ChatService {
  constructor(
    private upload = uploadService,
    private store = storageService,
  ) {}
  async createMockConversation(userId: string) {
    try {
      const conversation = await apiCreateConversation({
        type: ConversationType.SINGLE,
        userIds: [userId],
      });

      if (!conversation) {
        return undefined;
      }

      const member = conversation.members.find(
        (member) => member.user._id !== userId,
      );

      if (member) {
        const { privateKey, publicKey, P, G } = await generateDHKeys();

        await apiUpdateMember({
          memberId: member._id,
          publicKey: publicKey.toString(),
          p: P.toString(),
          g: G.toString(),
        });

        await storageService.setConversationPrivateKey(
          conversation._id,
          privateKey.toString(),
        );

        conversation.members = conversation.members.map((member) => {
          if (member.user._id === userId) return member;

          return {
            ...member,
            publicKey: publicKey.toString(),
            p: P.toString(),
            g: G.toString(),
          };
        });
      }

      return conversation;
    } catch (error) {
      console.error('Failed to create mock conversation:', error);
      return undefined;
    }
  }

  getSender(conversation: Conversation, currentUserId: string) {
    return conversation?.members.find(
      (member) => member.user._id === currentUserId,
    );
  }

  async createMessage({
    content,
    type,
    conversationId,
    sender,
    attachments = [],
    sharedKey,
  }: CreateMessage) {
    try {
      let imagePaths: (string | undefined)[] = [];
      let originalContent = content;
      let originalAttachments;

      if ([MessageType.IMAGE, MessageType.FILE].includes(type)) {
        imagePaths = await this.upload.mutilpleUpload(
          attachments,
          UploadType.CHAT,
        );

        attachments = attachments
          .map((attachment, index) => {
            if (!imagePaths[index]) return null;
            return {
              ...attachment,
              path: imagePaths[index],
            };
          })
          .filter((item) => !!item?.path) as Attachment[];

        originalAttachments = attachments;

        if (sharedKey) {
          attachments = await Promise.all(
            attachments.map(async (attachment) => ({
              ...attachment,
              path: (await encryptMessage(attachment.path, sharedKey)) ?? '',
            })),
          );
        }

        if (!attachments.length) return null;
      }

      if (sharedKey && content) {
        content = (await encryptMessage(content, sharedKey)) ?? '';
      }

      const message = await apiCreateMessage({
        type,
        content,
        sender: sender._id,
        conversation: conversationId,
        attachments: attachments,
        isEncrypted: !!sharedKey,
      });

      if (!message) {
        console.error('Failed to send message');
        return null;
      }

      if (sharedKey) {
        if (message.content) {
          message.content = originalContent;
        }

        if (message.attachments?.length) {
          message.attachments = originalAttachments;
        }
      }

      message.sender = sender;

      return message;
    } catch (error) {
      console.error('Failed to send message:', error);
      return null;
    }
  }

  async getConversationById(conversationId: string) {
    try {
      const data = await apiGetConversationById({
        id: conversationId,
      });

      return data;
    } catch (error) {}
  }

  async generateConversationSharedKey(
    conversation: Conversation,
    userId?: string,
  ) {
    if (!userId) return;

    const member = conversation.members.find(
      (member) => member.user._id === userId,
    );
    const otherMember = conversation.members.find(
      (member) => member.user._id !== userId,
    );

    if (!member || !otherMember) return;

    if (otherMember.publicKey && otherMember.p && otherMember.g) {
      const { P, G, publicKey, privateKey } = await generateDHKeys(
        BigInt(otherMember.p),
        BigInt(otherMember.g),
      );

      await apiUpdateMember({
        memberId: member._id,
        p: P.toString(),
        g: G.toString(),
        publicKey: publicKey.toString(),
      });

      await this.store.setConversationPrivateKey(
        conversation._id,
        privateKey.toString(),
      );

      return generateSharedKey(BigInt(otherMember.publicKey), privateKey, P);
    }

    const { P, G, publicKey, privateKey } = await generateDHKeys();

    apiUpdateMember({
      memberId: member._id,
      p: P.toString(),
      g: G.toString(),
      publicKey: publicKey.toString(),
    });

    await this.store.setConversationPrivateKey(
      conversation._id,
      privateKey.toString(),
    );

    return;
  }
  async updatedConversation(conversation: Conversation, userId?: string) {
    if (!userId) return conversation;

    const privateKey = await storageService.getConversationPrivateKey(
      conversation._id,
    );

    const otherMember = conversation.members?.find(
      (member) => member.user._id !== userId,
    );

    if (!privateKey) {
      const sharedKey = await chatService.generateConversationSharedKey(
        conversation,
        userId,
      );

      const lastMessage =
        conversation?.lastMessage?.type === MessageType.TEXT && sharedKey
          ? await messageV2(
              conversation?.lastMessage,
              sharedKey.toString(16).slice(0, 32),
            )
          : conversation?.lastMessage;

      return {
        ...conversation,
        sharedKey: sharedKey ? sharedKey.toString(16).slice(0, 32) : undefined,
        lastMessage: lastMessage,
      };
    }

    if (!otherMember?.publicKey || !otherMember.p || !otherMember.g)
      return conversation;

    const sharedKey = generateSharedKey(
      BigInt(otherMember.publicKey),
      BigInt(privateKey),
      BigInt(otherMember.p),
    )
      .toString(16)
      .slice(0, 32);

    const lastMessage =
      conversation?.lastMessage?.type === MessageType.TEXT
        ? await messageV2(conversation?.lastMessage, sharedKey)
        : conversation?.lastMessage;

    return {
      ...conversation,
      sharedKey: sharedKey,
      lastMessage: lastMessage,
    };
  }
}

export const chatService = new ChatService();
