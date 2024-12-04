import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../api/login.api';
import { Conversation } from '../api/getConversations.api';
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
  },
});

export const { setConversations, setNewConversation, setLastMessage } =
  conversationsSlice.actions;
export default conversationsSlice.reducer;
