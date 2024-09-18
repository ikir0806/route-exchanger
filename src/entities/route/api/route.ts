import { CreateRouteDto, GetRouteDto } from '@entities';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@shared/api/axios-base-query';
import axios from 'axios';

export const create = async (values: CreateRouteDto, userId: number): Promise<number> => {
  const res = await axios.post('/routes/create?userId=' + userId, values);
  return res.data.id;
};

export const findByLocation = async (location: string): Promise<GetRouteDto[]> => {
  const result = await axios.get('/routes/findByLocation?location=' + location);
  return result.data;
};

export const findByUser = async (userId: number): Promise<GetRouteDto[]> => {
  const result = await axios.get('/routes/findByUser?userId=' + userId);
  return result.data;
};

export const routeApi = createApi({
  reducerPath: 'routeApi',
  tagTypes: ['route'],
  baseQuery: axiosBaseQuery(),
  endpoints(build) {
    return {
      createRoute: build.mutation<number, { values: CreateRouteDto; userId: number }>({
        query: ({ values, userId }) => ({
          url: `/routes/create?userId=${userId}`,
          method: 'post',
          data: values,
        }),
        transformResponse: (response: { id: number }) => response.id,
      }),
      findByLocation: build.query({
        query: (location: string) => ({
          url: `/routes/findByLocation?location=${location}`,
          method: 'get',
        }),
      }),
      findByUser: build.query({
        query: (userId: number) => ({
          url: `/routes/findByUser?userId=${userId}`,
          method: 'get',
        }),
      }),
    };
  },
});

export const {
  useFindByUserQuery,
  useFindByLocationQuery,
  useLazyFindByUserQuery,
  useLazyFindByLocationQuery,
  useCreateRouteMutation,
} = routeApi;
