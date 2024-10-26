import { Routes } from '../constants/api.const';
import { httpService } from '../services';

export const apiLogout = () => {
  return httpService.delete(Routes.LOGOUT);
};
