import { Routes } from '../constants';
import { httpService } from '../services';
import { User } from './login.api';

export interface UpdateDeviceTokenPayload {
  deviceToken: string;
}

export const apiUpdateDeviceToken = (body: UpdateDeviceTokenPayload) => {
  return httpService.patch<User, UpdateDeviceTokenPayload>(
    Routes.UPDATE_DEVICE_TOKEN,
    body,
  );
};
