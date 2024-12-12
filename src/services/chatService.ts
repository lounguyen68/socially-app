import { apiCreateConversation } from '../api/createConversation.api';
import { apiCreateMessage } from '../api/createMessage.api';
import { apiGetConversationById } from '../api/getConversationById.api';
import { Conversation, Member } from '../api/getConversations.api';
import { Attachment } from '../api/getMessages.api';
import { apiUpdateMember } from '../api/updateMember.api';
import { ConversationType, MessageType, UploadType } from '../constants';
import { encryptMessage, generateDHKeys, generateSharedKey } from '../helpers';
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
}

export const chatService = new ChatService();
