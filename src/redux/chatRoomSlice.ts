import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation, Member } from '../api/getConversations.api';
import { Message } from '../api/getMessages.api';

interface ChatRoomState {
  _id?: string;
  conversation?: Conversation;
  messages: Message[];
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
        messages: Message[];
      }>,
    ) => {
      state._id = action.payload._id;
      state.conversation = action.payload.conversation;
      state.messages = action.payload.messages;
    },

    updateChatRoom: (
      state,
      action: PayloadAction<{
        conversation: Conversation;
      }>,
    ) => {
      state.conversation = action.payload.conversation;
    },

    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = [...state.messages, ...action.payload];
    },

    setNewMessage: (state, action: PayloadAction<Message>) => {
      state.messages.unshift(action.payload);
    },
  },
});

export const { setChatRoom, updateChatRoom, setMessages, setNewMessage } =
  chatRoomSlice.actions;
export default chatRoomSlice.reducer;
