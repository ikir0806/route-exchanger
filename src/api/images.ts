import axios from 'axios';
import { ImageItem } from './dto/image.dto';

type ImageType = 'all' | 'photos' | 'trash';

export const getAll = async (type: ImageType = 'all'): Promise<ImageItem[]> => {
  return (await axios.get('/images?type=' + type)).data;
};

export const remove = (ids: number[]): Promise<void> => {
  return axios.delete('/images?ids=' + ids);
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
    const { data } = await axios.post('images?userId=' + userId, formData, config);

    onSuccess();

    return data;
  } catch (err) {
    onError({ err });
  }
};
