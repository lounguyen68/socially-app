export interface UploadPayload {
  url: string;
  body: Blob;
}

export const apiUpload = ({ url, body }: UploadPayload) => {
  console.log(JSON.stringify(body));
  const urlObj = new URL(url);
  return fetch(urlObj, {
    method: 'PUT',
    body,
  });
};
