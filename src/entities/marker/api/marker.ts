import { CreateMarkerDto } from '@entities';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@shared/api/axios-base-query';

export const markerApi = createApi({
  reducerPath: 'markerApi',
  tagTypes: ['markers'],
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    createMarker: build.mutation<number, { value: CreateMarkerDto; routeId: number }>({
      query: ({ value, routeId }) => ({
        url: `/marker/create?routeId=${routeId}`,
        method: 'post',
        data: value,
      }),
      transformResponse: (response: { id: number }) => response.id,
    }),
  }),
});

export const { useCreateMarkerMutation } = markerApi;
