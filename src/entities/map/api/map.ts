import { ImageItemDto } from '@entities';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@shared/api/axios-base-query';
import instance from '@shared/api/axios-instance';
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
    const { data } = await instance.post(`maps?routeId=${routeId}`, formData, config);

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
        url: `maps?userId=${userId}`,
        method: 'get',
      }),
    }),
    removeMap: build.mutation({
      query: (userId: number) => ({
        url: `maps?userId=${userId}`,
        method: 'delete',
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uploadMap: build.mutation<ImageItemDto, { routeId: number; file: File }>({
      query: ({ routeId, file }) => {
        const formData = new FormData();
        formData.append('file', file);

        const config = {
          headers: { 'Content-Type': 'multipart/form-data' },
        };

        return {
          url: `maps?routeId=${routeId}`,
          method: 'post',
          body: formData,
          config,
          headers: { 'Content-Type': 'multipart/form-data' },
        };
      },
    }),
  }),
});

export const { useGetMapQuery, useRemoveMapMutation, useUploadMapMutation } = mapApi;
