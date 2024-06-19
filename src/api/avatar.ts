import axios from 'axios';
import { ImageItem } from './dto/image.dto';

export const get = async (userId: number): Promise<ImageItem> => {
  return (await axios.get('/avatar?userId=' + userId)).data;
};

export const remove = (userId: number): Promise<void> => {
  return axios.delete('/avatar?userId=' + userId);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadFile = async (userId: number, options: any) => {
  const { onSuccess, onError, file, onProgress } = options;

  const formData = new FormData();
  formData.append('file', file);

  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
    onProgress: (event: ProgressEvent) => {
      onProgress({ percent: (event.loaded / event.total) * 100 });
    },
  };

  try {
    const { data } = await axios.post('avatar?userId=' + userId, formData, config);

    onSuccess();

    return data;
  } catch (err) {
    onError({ err });
  }
};
