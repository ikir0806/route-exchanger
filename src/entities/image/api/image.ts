import { ImageItemDto } from '@entities';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@shared/api/axios-base-query';
import axios from 'axios';

type ImageType = 'all' | 'photos' | 'trash';

export const getAll = async (type: ImageType = 'all'): Promise<ImageItemDto[]> => {
  return (await axios.get('/images?type=' + type)).data;
};

export const remove = (ids: number[]): Promise<void> => {
  return axios.delete('/images?ids=' + ids);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadFiles = async (markerId: number, options: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options.forEach(async (option: any) => {
    const { onSuccess, onError, file, onProgress } = option;

    const formData = new FormData();
    formData.append('file', file);

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      onProgress: (event: ProgressEvent) => {
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };

    try {
      const { data } = await axios.post('images?markerId=' + markerId, formData, config);

      onSuccess();

      return data;
    } catch (err) {
      onError({ err });
    }
  });
};

export const imageApi = createApi({
  reducerPath: 'imageApi',
  tagTypes: ['image'],
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getAllImages: build.query({
      query: (type: ImageType = 'all') => ({
        url: `/images?type=${type}`,
        method: 'get',
      }),
    }),
    removeImage: build.mutation({
      query: (ids: number[]) => ({
        url: `/images?ids=${ids}`,
        method: 'delete',
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uploadImages: build.mutation<ImageItemDto[], { markerId: number; options: any }>({
      query: ({ markerId, options }) => {
        const formData = new FormData();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        options.forEach((option: any) => {
          const { file } = option;
          formData.append('files', file);
        });
        return {
          url: `/images?markerId=${markerId}`,
          method: 'post',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        };
      },
    }),
  }),
});

export const { useGetAllImagesQuery, useRemoveImageMutation, useUploadImagesMutation } = imageApi;
