import { CreateRouteDto } from '@entities';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@shared/api/axios-base-query';

export const routeApi = createApi({
  reducerPath: 'routeApi',
  tagTypes: ['route'],
  baseQuery: axiosBaseQuery(),
  endpoints(build) {
    return {
      createRoute: build.mutation<number, { values: CreateRouteDto; userId: number }>({
        query: ({ values, userId }) => ({
          url: `/route/create?userId=${userId}`,
          method: 'post',
          data: values,
        }),
        transformResponse: (response: { id: number }) => response.id,
      }),
      findByLocation: build.query({
        query: (location: string) => ({
          url: `/route/findByLocation?location=${location}`,
          method: 'get',
        }),
      }),
      findByUser: build.query({
        query: (userId: number) => ({
          url: `/route/findByUser?userId=${userId}`,
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
