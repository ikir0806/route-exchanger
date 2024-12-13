import { CreateRouteDto } from '@entities';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@shared/api/axios-base-query';
import instance from '@shared/api/axios-instance';

export const addMap = async (mapFilename: string, routeId: number) => {
  try {
    const { data } = await instance.patch(
      `/route/addMap?routeId=${routeId}&mapFilename=${mapFilename}`,
    );

    return data;
  } catch (err) {
    console.error('Upload failed', err);
    throw err;
  }
};

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
      addMap: build.mutation({
        query: ({ mapFilename, routeId }) => ({
          url: `/route/addMap?routeId=${routeId}&mapFilename=${mapFilename}`,
          method: 'patch',
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
  useAddMapMutation,
} = routeApi;
