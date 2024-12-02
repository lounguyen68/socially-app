import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation, Member } from '../api/getConversations.api';

interface ChatRoomState {
  id?: string;
  conversation?: Conversation;
  messages: any[];
}

const initialState: ChatRoomState = {
  messages: [],
};

const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState,
  reducers: {
    setChatRoom: (
      state,
      action: PayloadAction<{
        id?: string;
        conversation?: Conversation;
        messages: any[];
      }>,
    ) => {
      state = {
        ...action.payload,
      };
    },

    setMessages: (state, action: PayloadAction<any[]>) => {
      state.messages = action.payload;
    },
  },
});

export const { setChatRoom } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
