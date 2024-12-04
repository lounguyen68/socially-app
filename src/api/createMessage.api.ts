import { MessageType, Routes } from '../constants';
import { httpService } from '../services';
import { Conversation } from './getConversations.api';
import { Message } from './getMessages.api';

export interface CreateMessagePayload {
  type: MessageType;
  content?: string;
  sender: string;
  conversation: string;
}

export const apiCreateMessage = (params: CreateMessagePayload) => {
  return httpService.post<Message, CreateMessagePayload>(
    Routes.CREATE_MESSAGE,
    params,
  );
};
