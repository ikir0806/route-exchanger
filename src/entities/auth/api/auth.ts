import {
  LoginFormDto,
  LoginResponseDto,
  RegisterFormDto,
  RegisterResponseDto,
  UserFormDto,
} from '@entities';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@shared/api/axios-base-query';
import instance from '@shared/api/axios-instance';
import { destroyCookie } from 'nookies';

export const login = async (values: LoginFormDto): Promise<LoginResponseDto> => {
  return (await instance.post('/auth/login', values)).data;
};

export const register = async (values: RegisterFormDto): Promise<RegisterResponseDto> => {
  return (await instance.post('/auth/register', values)).data;
};

export const getMe = async (): Promise<UserFormDto> => {
  return (await instance.get('/users/me')).data;
};

export const logOut = async () => {
  destroyCookie(null, '_token', { path: '/' });
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
      getMe: build.query({
        query: () => ({
          url: '/users/me',
          method: 'get',
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

export const { useLoginMutation, useRegisterMutation, useGetMeQuery, useLogOutMutation } = authApi;
