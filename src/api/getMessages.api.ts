import { MessageType } from '../constants';
import { Routes } from '../constants/api.const';
import { httpService } from '../services';
import { Member } from './getConversations.api';

export interface Attachment {
  name: string;
  path: string;
  metadata: {
    mimeType: string;
    width?: number;
    height?: number;
    size: number;
  };
  conversation?: string;
  message?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Message {
  _id: string;
  type: MessageType;
  content?: string;
  sender: Member;
  conversation: string;
  attachments?: Attachment[];
  createdAt: Date;
  updatedAt: Date;
  isEncrypted?: boolean;
}

export interface GetMessagesPayload {
  limit: number;
  skip: number;
  conversationId: string;
}

export const apiGetMessages = (params: GetMessagesPayload) => {
  return httpService.get<Message[]>(Routes.GET_MESSAGES, params);
};
