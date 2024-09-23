import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@shared/api/axios-base-query';

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
