import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../api/login.api';
import { Conversation } from '../api/getConversations.api';

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
  },
});

export const { setConversations } = conversationsSlice.actions;
export default conversationsSlice.reducer;
