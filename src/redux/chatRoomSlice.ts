import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation, Member } from '../api/getConversations.api';
import { Message } from '../api/getMessages.api';

interface ChatRoomState {
  _id?: string;
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
        _id?: string;
        conversation?: Conversation;
        messages: any[];
      }>,
    ) => {
      state._id = action.payload._id;
      state.conversation = action.payload.conversation;
      state.messages = action.payload.messages;
    },

    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = [...state.messages, ...action.payload];
    },

    setNewMessage: (state, action: PayloadAction<Message>) => {
      state.messages.unshift(action.payload);
    },
  },
});

export const { setChatRoom, setMessages, setNewMessage } =
  chatRoomSlice.actions;
export default chatRoomSlice.reducer;
