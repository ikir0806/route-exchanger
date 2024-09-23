import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@shared/api/axios-base-query';
import instance from '@shared/api/axios-instance';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadFile = async (routeId: number, file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };

  try {
    const { data } = await instance.post(`map?routeId=${routeId}`, formData, config);

    return data;
  } catch (err) {
    console.error('Upload failed', err);
    throw err;
  }
};

export const mapApi = createApi({
  reducerPath: 'mapApi',
  tagTypes: ['map'],
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getMap: build.query({
      query: (userId: number) => ({
        url: `map?userId=${userId}`,
        method: 'get',
      }),
    }),
    removeMap: build.mutation({
      query: (userId: number) => ({
        url: `map?userId=${userId}`,
        method: 'delete',
      }),
    }),
  }),
});

export const { useGetMapQuery, useRemoveMapMutation } = mapApi;
