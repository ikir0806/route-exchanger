import { ImageItemDto } from '@entities';
import axios from 'axios';

export const get = async (userId: number): Promise<ImageItemDto> => {
  return (await axios.get('/maps?userId=' + userId)).data;
};

export const remove = (userId: number): Promise<void> => {
  return axios.delete('/maps?userId=' + userId);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadFile = async (routeId: number, file: File) => {
  // Создаём FormData и добавляем файл
  const formData = new FormData();
  formData.append('file', file);

  // Конфигурация для axios запроса
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };

  try {
    const { data } = await axios.post(`maps?routeId=${routeId}`, formData, config);

    return data;
  } catch (err) {
    console.error('Upload failed', err);
    throw err;
  }
};
