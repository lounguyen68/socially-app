import { Routes } from '../constants';
import { httpService } from '../services';
import { Conversation } from './getConversations.api';

export interface GetConversationByIdPayload {
  id: string;
}

export const apiGetConversationById = (params: GetConversationByIdPayload) => {
  return httpService.get<Conversation | undefined>(
    Routes.GET_CONVERSATION_BY_ID + '/' + params.id,
  );
};
