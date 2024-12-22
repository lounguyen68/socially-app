import { Routes } from '../constants/api.const';
import { httpService } from '../services/httpService';

export interface RefreshTokenPayload {
  refreshToken: string;
  deviceToken?: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const apiRefreshToken = (body: RefreshTokenPayload) => {
  return httpService.put<RefreshTokenResponse, RefreshTokenPayload>(
    Routes.REFRESH_TOKEN,
    body,
  );
};
