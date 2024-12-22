import { Routes } from '../constants';
import { httpService } from '../services';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const apiRegister = (body: RegisterPayload) => {
  return httpService.post<any, RegisterPayload>(Routes.SIGNUP, body);
};
