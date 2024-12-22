import { Routes } from '../constants/api.const';
import { httpService } from '../services/httpService';
import { Member } from './getConversations.api';

export interface UpdateMemberPayload {
  memberId: string;
  p: string;
  g: string;
  publicKey: string;
}

export const apiUpdateMember = (body: UpdateMemberPayload) => {
  return httpService.put<Member, UpdateMemberPayload>(
    Routes.UPDATE_MEMBER,
    body,
  );
};
