import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ServerEmitMessages } from '../constants';
import { Message } from '../api/getMessages.api';
import { useDispatch } from 'react-redux';
import { setNewMessage } from '../redux/chatRoomSlice';
import {
  setLastMessage,
  setNewConversation,
} from '../redux/conversationsSlice';
import { Conversation } from '../api/getConversations.api';
import { useServices } from './Services.context';

const SOCKET_URL = `${process.env.EXPO_PUBLIC_API_URL}/socket.io`;

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const dispatch = useDispatch();
  const { http, chatService } = useServices();

  const handleNewMessage = (message: Message) => {
    console.log('handleNewMessage');
    dispatch(setNewMessage(message));
    dispatch(setLastMessage({ conversationId: message.conversation, message }));
  };

  const handleNewConversation = (conversation: Conversation) => {
    console.log('handleNewConversation');

    chatService
      .getConversationById(conversation._id)
      .then((data) => {
        if (!data) return;

        dispatch(setNewConversation({ conversation: data }));
      })
      .catch((error) => {});
  };

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'],
      auth: {
        token: http.getToken(),
      },
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
      timeout: 10000,
    });

    setSocket(newSocket);

    newSocket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    newSocket.on('connect', () => {});

    newSocket.on('disconnect', (reason) => {});

    newSocket.on(ServerEmitMessages.NEW_MESSAGE, handleNewMessage);

    newSocket.on(ServerEmitMessages.NEW_CONVERSATION, handleNewConversation);

    return () => {
      newSocket.disconnect();
      newSocket.off(ServerEmitMessages.NEW_MESSAGE, handleNewMessage);
      newSocket.off(ServerEmitMessages.NEW_CONVERSATION, handleNewConversation);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
