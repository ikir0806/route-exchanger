import { LoginFormDto, RegisterFormDto, UserFormDto } from '@entities';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@shared/api/axios-base-query';
import instance from '@shared/api/axios-instance';
import { destroyCookie } from 'nookies';

export const getMe = async (): Promise<UserFormDto> => {
  return (await instance.get('/user/me')).data;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['auth'],
  baseQuery: axiosBaseQuery(),
  endpoints(build) {
    return {
      login: build.mutation({
        query: (values: LoginFormDto) => ({
          url: '/auth/login',
          method: 'post',
          data: values,
        }),
      }),
      register: build.mutation({
        query: (values: RegisterFormDto) => ({
          url: '/auth/register',
          method: 'post',
          data: values,
        }),
      }),
      logOut: build.mutation({
        queryFn: async () => {
          destroyCookie(null, '_token', { path: '/' });
          return { data: undefined };
        },
      }),
    };
  },
});

export const { useLoginMutation, useRegisterMutation, useLogOutMutation } = authApi;
