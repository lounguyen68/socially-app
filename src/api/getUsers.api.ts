import { Routes } from '../constants/api.const';
import { httpService } from '../services';
import { User } from './login.api';

export interface GetUsersPayload {
  limit: number;
  skip: number;
  keyword?: string;
}

export const apiGetUsers = (params: GetUsersPayload) => {
  return httpService.get<User[]>(Routes.GET_USERS, params);
};
