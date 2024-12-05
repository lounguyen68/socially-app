import { Routes } from '../constants';
import { httpService } from '../services';
import { User } from './login.api';

export interface UpdateUserAvatarPayload {
  avatarPath: string;
}

export const apiUpdateUserAvatar = (body: UpdateUserAvatarPayload) => {
  return httpService.patch<User, UpdateUserAvatarPayload>(
    Routes.UPDATE_USER_AVATAR,
    body,
  );
};
