import { ConversationType, Routes } from '../constants';
import { httpService } from '../services';
import { Conversation } from './getConversations.api';

export interface GetConversationByUserIdPayload {
  type: ConversationType;
  userId: string;
}

export const apiGetConversationByUserId = (
  params: GetConversationByUserIdPayload,
) => {
  return httpService.get<Conversation | undefined>(
    Routes.GET_CONVERSATION_BY_USER_ID,
    params,
  );
};
