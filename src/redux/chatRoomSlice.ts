import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../api/login.api';

interface ChatRoomState {
  id?: string;
  users: User[];
  messages: any[];
}

const initialState: ChatRoomState = {
  users: [],
  messages: [],
};

const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState,
  reducers: {
    setChatRoom: (
      state,
      action: PayloadAction<{
        id: string;
        users: User[];
        messages: any[];
      }>,
    ) => {
      if (state.id === action.payload.id) return;

      state = {
        ...action.payload,
      };
    },
  },
});

export const { setChatRoom } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
