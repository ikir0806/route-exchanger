import { CreateMarkerDto } from '@entities';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@shared/api/axios-base-query';
import axios from 'axios';

export const create = async (value: CreateMarkerDto, routeId: number): Promise<number> => {
  const res = await axios.post('/markers/create?routeId=' + routeId, value);
  return res.data.id;
};

export const markerApi = createApi({
  reducerPath: 'markerApi',
  tagTypes: ['markers'],
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    createMarker: build.mutation<number, { value: CreateMarkerDto; routeId: number }>({
      query: ({ value, routeId }) => ({
        url: `/markers/create?routeId=${routeId}`,
        method: 'post',
        data: value,
      }),
      transformResponse: (response: { id: number }) => response.id,
    }),
  }),
});

export const { useCreateMarkerMutation } = markerApi;
