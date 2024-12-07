import { apiCreateConversation } from '../api/createConversation.api';
import { apiCreateMessage } from '../api/createMessage.api';
import { apiGetConversationById } from '../api/getConversationById.api';
import { Conversation, Member } from '../api/getConversations.api';
import { Attachment } from '../api/getMessages.api';
import { ConversationType, MessageType, UploadType } from '../constants';
import { uploadService } from './uploadService';

interface CreateMessage {
  content: string;
  type: MessageType;
  attachments?: Attachment[];
  conversationId: string;
  sender: Member;
}

class ChatService {
  constructor(private upload = uploadService) {}
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
  }: CreateMessage) {
    try {
      let imagePaths: (string | undefined)[] = [];

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
          .filter((item) => !!item);
      }

      const message = await apiCreateMessage({
        type,
        content,
        sender: sender._id,
        conversation: conversationId,
        attachments: attachments,
      });

      if (!message) {
        console.error('Failed to send message');
        return null;
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
}

export const chatService = new ChatService();
