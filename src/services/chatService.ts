import { apiCreateConversation } from '../api/createConversation.api';
import { apiCreateMessage } from '../api/createMessage.api';
import { apiGetConversationById } from '../api/getConversationById.api';
import { Conversation, Member } from '../api/getConversations.api';
import { ConversationType, MessageType } from '../constants';

class ChatService {
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

  async createMessage(
    content: string,
    type: MessageType,
    conversationId: string,
    sender: Member,
  ) {
    try {
      const message = await apiCreateMessage({
        type,
        content,
        sender: sender._id,
        conversation: conversationId,
      });

      if (!message) {
        console.error('Failed to create message.');
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
