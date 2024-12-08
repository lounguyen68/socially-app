import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { ServerEmitMessages } from '../constants';
import { Message } from '../api/getMessages.api';
import { useDispatch, useSelector } from 'react-redux';
import { setNewMessage } from '../redux/chatRoomSlice';
import {
  setLastMessage,
  setNewConversation,
} from '../redux/conversationsSlice';
import { Conversation } from '../api/getConversations.api';
import { useServices } from './Services.context';
import { RootState } from '../redux/store';

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
  const { user } = useSelector((state: RootState) => state.user);
  const { _id } = useSelector((state: RootState) => state.chatRoom);

  const handleNewMessage = useCallback(
    (message: Message) => {
      dispatch(
        setLastMessage({ conversationId: message.conversation, message }),
      );
      if (_id !== message.conversation) return;

      dispatch(setNewMessage(message));
    },
    [_id],
  );

  const handleNewConversation = useCallback(
    (conversation: Conversation) => {
      const isYourConversation = conversation.members.some(
        (member) => member.user._id === user?._id,
      );

      if (!isYourConversation) return;

      chatService
        .getConversationById(conversation._id)
        .then((data) => {
          if (!data) return;

          dispatch(setNewConversation({ conversation: data }));
        })
        .catch((error) => {});
    },
    [user],
  );

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

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket?.on(ServerEmitMessages.NEW_MESSAGE, handleNewMessage);

    socket?.on(ServerEmitMessages.NEW_CONVERSATION, handleNewConversation);

    return () => {
      socket?.off(ServerEmitMessages.NEW_MESSAGE, handleNewMessage);
      socket?.off(ServerEmitMessages.NEW_CONVERSATION, handleNewConversation);
    };
  }, [socket, _id, user]);

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
