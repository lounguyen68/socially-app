import { Routes } from '../constants/api.const';
import { httpService } from '../services';

export interface User {
  _id: string;
  name: string;
  email: string;
  avatarPath: string;
}

export interface LoginPayload {
  name: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const apiLogin = (body: LoginPayload) => {
  return httpService.post<LoginResponse, LoginPayload>(Routes.LOGIN, body);
};
