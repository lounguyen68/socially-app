import { Routes } from '../constants/api.const';
import { httpService } from '../services/httpService';

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const apiRefreshToken = (body: RefreshTokenPayload) => {
  return httpService.post<RefreshTokenResponse>(Routes.REFRESH_TOKEN, body);
};
