import { ImageItemDto } from '@entities';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@shared/api/axios-base-query';
import axios from 'axios';

export const get = async (userId: number): Promise<ImageItemDto> => {
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

export interface UploadFileParams {
  userId: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
}

export const avatarApi = createApi({
  reducerPath: 'avatarApi',
  tagTypes: ['avatar'],
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getAvatar: build.query({
      query: (userId: number) => ({
        url: `avatar?userId=${userId}`,
        method: 'get',
      }),
    }),
    removeAvatar: build.mutation({
      query: (userId: number) => ({
        url: `avatar?userId=${userId}`,
        method: 'delete',
      }),
    }),
    uploadAvatar: build.mutation<void, UploadFileParams>({
      query: ({ userId, options }) => {
        const { file } = options;
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: `avatar?userId=${userId}`,
          method: 'post',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      },
    }),
  }),
});

export const { useGetAvatarQuery, useRemoveAvatarMutation, useUploadAvatarMutation } = avatarApi;
