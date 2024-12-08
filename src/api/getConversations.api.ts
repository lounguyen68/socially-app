import { ConversationType } from '../constants';
import { Routes } from '../constants/api.const';
import { httpService } from '../services';
import { Message } from './getMessages.api';
import { User } from './login.api';

export interface Member {
  _id: string;
  user: User;
  lastTimeSeen: string;
}

export interface Conversation {
  _id: string;
  name?: string;
  type: ConversationType;
  members: Member[];
  lastMessage: Message;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GetConversationsPayload {
  limit: number;
  skip: number;
  keyword?: string;
}

export const apiGetConversations = (params: GetConversationsPayload) => {
  return httpService.get<Conversation[]>(Routes.GET_CONVERSATIONS, params);
};
