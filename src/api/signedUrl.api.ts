import { Routes, UploadType } from '../constants';
import { httpService } from '../services';

export interface SignedUrlPayload {
  key: string;
  contentType: string;
  uploadType: UploadType;
}

export const apiSignedUrl = (body: SignedUrlPayload) => {
  return httpService.post<{ url: string }, SignedUrlPayload>(
    Routes.SIGNED_URL,
    body,
  );
};
