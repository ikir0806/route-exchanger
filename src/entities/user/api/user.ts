import { UpdateUserFormDto } from '@entities';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@shared/api/axios-base-query';
import axios from 'axios';

export const update = async (values: UpdateUserFormDto): Promise<void> => {
  await axios.patch('/users/me', values);
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    updateUser: build.mutation<void, UpdateUserFormDto>({
      query: (values) => ({
        url: '/users/me',
        method: 'patch',
        body: values,
      }),
    }),
  }),
});

export const { useUpdateUserMutation } = userApi;
