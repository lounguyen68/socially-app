import { apiRefreshToken } from '../api/refreshToken.api';
import { AppDispatch } from '../redux/store';
import { login } from '../redux/userSlice';
import { storageService } from './storageService';
import { httpService } from './httpService';
import * as SplashScreen from 'expo-splash-screen';

class UserService {
  constructor(
    private storage = storageService,
    private http = httpService,
  ) {}

  checkRememberLogin = async (dispatch: AppDispatch) => {
    const refreshToken = await this.storage.getRefreshToken();

    if (!refreshToken) {
      return SplashScreen.hideAsync();
    }

    try {
      const response = await apiRefreshToken({ refreshToken });

      const userInfo = await this.storage.getUserInfo();

      if (!userInfo) return;

      dispatch(login({ user: userInfo, ...response }));
      this.http.setToken(response.accessToken);
      this.storage.setRefreshToken(response.refreshToken);
    } catch (error) {
      console.error('Error while refreshing token:', error);
    } finally {
      SplashScreen.hideAsync();
    }
  };
}

export const userService = new UserService();
