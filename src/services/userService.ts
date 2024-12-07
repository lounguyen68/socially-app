import { apiRefreshToken } from '../api/refreshToken.api';
import { AppDispatch } from '../redux/store';
import { login } from '../redux/userSlice';
import { storageService } from './storageService';
import { httpService } from './httpService';
import * as SplashScreen from 'expo-splash-screen';
import * as FileSystem from 'expo-file-system';
import { ImagePickerAsset } from 'expo-image-picker';
import { UploadType } from '../constants';
import { apiSignedUrl } from '../api/signedUrl.api';
import { apiUpload } from '../api/upload.api';
import { apiUpdateUserAvatar } from '../api/updateUserAvatar.api';
import { uploadService } from './uploadService';
import { Attachment } from '../api/getMessages.api';

class UserService {
  constructor(
    private storage = storageService,
    private http = httpService,
    private upload = uploadService,
  ) {}

  checkRememberLogin = async (dispatch: AppDispatch) => {
    const refreshToken = await this.storage.getRefreshToken();

    if (!refreshToken) {
      return SplashScreen.hideAsync();
    }

    try {
      const response = await apiRefreshToken({ refreshToken });
      this.http.setToken(response.accessToken);
      await this.storage.setRefreshToken(response.refreshToken);

      const userInfo = await this.storage.getUserInfo();

      if (!userInfo) return;

      dispatch(login({ user: userInfo, ...response }));
    } catch (error) {
      console.error('Error while refreshing token:', error);
    } finally {
      SplashScreen.hideAsync();
    }
  };

  updateUserAvatar = async (avatar: ImagePickerAsset) => {
    const { fileName, mimeType, uri } = avatar;

    if (!fileName || !mimeType || !uri) return;

    const attachment: Attachment = {
      name: fileName,
      path: uri,
      metadata: {
        mimeType: mimeType,
        size: avatar.fileSize ?? 0,
        width: avatar.width,
        height: avatar.height,
      },
    };

    try {
      const avatarPath = await this.upload.singleUpload(
        attachment,
        UploadType.AVATAR,
      );

      if (!avatarPath) return;

      return apiUpdateUserAvatar({ avatarPath });
    } catch (error) {
      console.log(error);
    }
  };
}

export const userService = new UserService();
