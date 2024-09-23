import { ImageItemDto } from '@entities';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@shared/api/axios-base-query';

type ImageType = 'all' | 'photos' | 'trash';

export const imageApi = createApi({
  reducerPath: 'imageApi',
  tagTypes: ['image'],
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getAllImages: build.query({
      query: (type: ImageType = 'all') => ({
        url: `/image?type=${type}`,
        method: 'get',
      }),
    }),
    removeImage: build.mutation({
      query: (ids: number[]) => ({
        url: `/image?ids=${ids}`,
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
          url: `/image?markerId=${markerId}`,
          method: 'post',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        };
      },
    }),
  }),
});

export const { useGetAllImagesQuery, useRemoveImageMutation, useUploadImagesMutation } = imageApi;
