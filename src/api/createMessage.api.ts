import { MessageType, Routes } from '../constants';
import { httpService } from '../services';
import { Attachment, Message } from './getMessages.api';

export interface CreateMessagePayload {
  type: MessageType;
  content?: string;
  attachments?: Attachment[];
  sender: string;
  conversation: string;
}

export const apiCreateMessage = (params: CreateMessagePayload) => {
  return httpService.post<Message, CreateMessagePayload>(
    Routes.CREATE_MESSAGE,
    params,
  );
};
