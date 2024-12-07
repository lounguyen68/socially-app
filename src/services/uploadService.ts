import { Attachment } from '../api/getMessages.api';
import { apiSignedUrl } from '../api/signedUrl.api';
import { apiUpload } from '../api/upload.api';
import { UploadType } from '../constants';

class UploadService {
  async singleUpload(attachment: Attachment, uploadType: UploadType) {
    try {
      const payload = {
        key: attachment.name,
        contentType: attachment.metadata.mimeType,
        uploadType: uploadType,
      };

      const { url } = await apiSignedUrl(payload);

      if (!url) return;

      const file = await fetch(attachment.path);

      const response = await apiUpload({
        url,
        body: await file.blob(),
      });

      if (!response.ok) return console.error(response);

      return url.split('?')?.[0];
    } catch (error) {
      console.error('error', error);
    }
  }

  async mutilpleUpload(attachments: Attachment[], uploadType: UploadType) {
    try {
      const results = await Promise.all(
        attachments.map((attachment) => {
          return this.singleUpload(attachment, uploadType);
        }),
      );

      return results;
    } catch (error) {
      console.log('error', error);
      return [];
    }
  }
}

export const uploadService = new UploadService();
