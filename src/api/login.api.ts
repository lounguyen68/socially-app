import { Routes } from '../constants/api.const';
import { httpService } from '../services';

export interface User {
  id: string;
  username: string;
  urlAvatar: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  userInfo: User;
  userToken: {
    accessToken: string;
    refreshToken: string;
  };
}

export const apiLogin = (body: LoginPayload) => {
  return httpService.post<LoginResponse>(Routes.LOGIN, body);
};
