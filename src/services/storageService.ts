import * as SecureStore from 'expo-secure-store';
import { User } from '../api/login.api';

enum StorageKey {
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  USER_INFO = 'USER_INFO',
}

class StorageService {
  private set = async (key: string, value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
      return true;
    } catch (err) {
      console.error('set storage', err);

      return false;
    }
  };

  private get = async (key: string) => {
    try {
      const value = await SecureStore.getItemAsync(key);
      return value;
    } catch (err) {
      console.error('get storage', err);
    }
  };

  private clear = async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (err) {
      console.error('get storage', err);
    }
  };

  setRefreshToken = async (value: string) => {
    const result = await this.set(StorageKey.REFRESH_TOKEN, value);
    return result;
  };

  getRefreshToken = async () => {
    const result = await this.get(StorageKey.REFRESH_TOKEN);
    return result;
  };

  clearRefreshToken = async () => {
    await this.clear(StorageKey.REFRESH_TOKEN);
  };

  setUserInfo = async (value: User) => {
    const result = await this.set(StorageKey.USER_INFO, JSON.stringify(value));
    return result;
  };

  getUserInfo = async () => {
    const result = await this.get(StorageKey.USER_INFO);
    if (!result) return;

    const userInfo = JSON.parse(result) as User;
    return userInfo;
  };

  clearUserInfo = async () => {
    await this.clear(StorageKey.USER_INFO);
  };
}

export const storageService = new StorageService();
