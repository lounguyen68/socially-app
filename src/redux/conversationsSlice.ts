import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../api/login.api';
import { Conversation, Member } from '../api/getConversations.api';
import { Message } from '../api/getMessages.api';

interface ConversationsState {
  conversations: Conversation[];
}

const initialState: ConversationsState = {
  conversations: [],
};

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    setConversations: (
      state,
      action: PayloadAction<{
        conversations: Conversation[];
        isRefreshing: boolean;
      }>,
    ) => {
      if (action.payload.isRefreshing) {
        state.conversations = action.payload.conversations;
        return;
      }

      state.conversations = [
        ...state.conversations,
        ...action.payload.conversations,
      ];
    },

    setNewConversation: (
      state,
      action: PayloadAction<{
        conversation: Conversation;
      }>,
    ) => {
      const { conversation } = action.payload;
      state.conversations.unshift(conversation);
    },
    setLastMessage: (
      state,
      action: PayloadAction<{
        conversationId: string;
        message: Message;
      }>,
    ) => {
      const { conversationId, message } = action.payload;

      const conversationIndex = state.conversations.findIndex(
        (conversation) => conversation._id === conversationId,
      );

      if (conversationIndex === -1) return;

      state.conversations[conversationIndex].lastMessage = message;
      state.conversations[conversationIndex].updatedAt = message.createdAt;

      const [updatedConversation] = state.conversations.splice(
        conversationIndex,
        1,
      );
      state.conversations.unshift(updatedConversation);
    },
    updateLastTimeSeen: (
      state,
      action: PayloadAction<{
        conversationId: string;
        userId: string;
        time: string;
      }>,
    ) => {
      const { conversationId, userId, time } = action.payload;

      const conversation = state.conversations.find(
        (conversation) => conversation._id === conversationId,
      );

      if (!conversation) return;

      const member = conversation.members.find(
        (member) => member.user._id === userId,
      );

      if (!member) return;

      member.lastTimeSeen = time;
    },
    setSharedKey: (
      state,
      action: PayloadAction<{
        conversationId: string;
        sharedKey: string;
      }>,
    ) => {
      const { conversationId, sharedKey } = action.payload;

      const conversationIndex = state.conversations.findIndex(
        (conversation) => conversation._id === conversationId,
      );

      if (conversationIndex === -1) return;

      state.conversations[conversationIndex].sharedKey = sharedKey;
    },
    updateMember: (
      state,
      action: PayloadAction<{
        conversationId: string;
        member: Member;
      }>,
    ) => {
      const { conversationId, member: updatedMember } = action.payload;

      const conversationIndex = state.conversations.findIndex(
        (conversation) => conversation._id === conversationId,
      );

      if (conversationIndex === -1) return;

      state.conversations[conversationIndex].members = state.conversations[
        conversationIndex
      ].members?.map((member) => {
        if (member._id !== updatedMember._id) return member;

        return {
          ...member,
          p: updatedMember.p,
          g: updatedMember.g,
          publicKey: updatedMember.publicKey,
        };
      });
    },
    updateConversation: (
      state,
      action: PayloadAction<{
        conversation: Conversation;
      }>,
    ) => {
      const { conversation } = action.payload;

      const conversationIndex = state.conversations.findIndex(
        (conversation) => conversation._id === conversation._id,
      );

      if (conversationIndex === -1) return;

      state.conversations[conversationIndex] = {
        ...state.conversations[conversationIndex],
        ...conversation,
      };
    },
  },
});

export const {
  setConversations,
  setNewConversation,
  setLastMessage,
  updateLastTimeSeen,
  setSharedKey,
  updateMember,
  updateConversation,
} = conversationsSlice.actions;
export default conversationsSlice.reducer;
