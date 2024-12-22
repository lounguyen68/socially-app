export interface UploadPayload {
  url: string;
  body: Blob;
}

export const apiUpload = ({ url, body }: UploadPayload) => {
  const urlObj = new URL(url);
  return fetch(urlObj, {
    method: 'PUT',
    body,
  });
};
