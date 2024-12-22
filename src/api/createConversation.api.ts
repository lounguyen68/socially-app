import { ConversationType, Routes } from '../constants';
import { httpService } from '../services';
import { Conversation } from './getConversations.api';

export interface CreateConversationPayload {
  type: ConversationType;
  userIds: string[];
}

export const apiCreateConversation = (params: CreateConversationPayload) => {
  return httpService.post<Conversation, CreateConversationPayload>(
    Routes.CREATE_CONVERSATION,
    params,
  );
};
