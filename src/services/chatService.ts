import { apiCreateConversation } from '../api/createConversation.api';
import { apiCreateMessage } from '../api/createMessage.api';
import { Conversation, Member } from '../api/getConversations.api';
import { Message } from '../api/getMessages.api';
import { ConversationType, MessageType } from '../constants';
import { Socket } from 'socket.io-client';

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
}

export const chatService = new ChatService();
