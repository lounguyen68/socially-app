import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import conversationsReducer from './conversationsSlice';
import chatRoomReducer from './chatRoomSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    conversations: conversationsReducer,
    chatRoom: chatRoomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
