import { ImageItemDto } from '@entities';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@shared/api/axios-base-query';

type ImageType = 'all' | 'photos' | 'trash';

export interface ExtraMutationFields {
  markerId: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
  routeId: number;
}

export const imageApi = createApi({
  reducerPath: 'imageApi',
  tagTypes: ['image'],
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getAllImages: build.query({
      query: (type: ImageType = 'all') => ({
        url: `/image/getAllImages?type=${type}`,
        method: 'get',
      }),
    }),
    getImagesByRouteId: build.query({
      query: (routeId: number) => ({
        url: `/image/getImagesByRouteId?routeId=${routeId}`,
        method: 'get',
      }),
    }),
    removeImage: build.mutation({
      query: (ids: number[]) => ({
        url: `/image?ids=${ids}`,
        method: 'delete',
      }),
    }),
    uploadImages: build.mutation<ImageItemDto[], ExtraMutationFields>({
      query: ({ markerId, routeId, options }) => {
        const formData = new FormData();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        options.forEach((option: any) => {
          const { file } = option;
          formData.append('files', file);
        });
        return {
          url: `/image?markerId=${markerId}&routeId=${routeId}`,
          method: 'post',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        };
      },
    }),
  }),
});

export const {
  useGetAllImagesQuery,
  useGetImagesByRouteIdQuery,
  useRemoveImageMutation,
  useUploadImagesMutation,
} = imageApi;
