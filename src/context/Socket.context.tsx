import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { API_URL } from '@env';
import { ServerEmitMessages } from '../constants';
import { Message } from '../api/getMessages.api';
import { useDispatch } from 'react-redux';
import { setNewMessage } from '../redux/chatRoomSlice';
import { setLastMessage } from '../redux/conversationsSlice';

const SOCKET_URL = `${API_URL}/socket.io`;

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const dispatch = useDispatch();

  const handleNewMessage = (message: Message) => {
    console.log(message);
    dispatch(setNewMessage(message));
    dispatch(setLastMessage({ conversationId: message.conversation, message }));
  };

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
      timeout: 10000,
    });

    setSocket(newSocket);

    newSocket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    newSocket.on('connect', () => {
      console.log('WebSocket connected');
    });

    newSocket.on('disconnect', (reason) => {
      console.warn('WebSocket disconnected:', reason);
    });

    newSocket.on(ServerEmitMessages.NEW_MESSAGE, handleNewMessage);

    return () => {
      newSocket.disconnect();
      newSocket.off(ServerEmitMessages.NEW_MESSAGE, handleNewMessage);
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
