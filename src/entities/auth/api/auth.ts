import {
  LoginFormDto,
  LoginResponseDto,
  RegisterFormDto,
  RegisterResponseDto,
  UserFormDto,
} from '@entities';
import { axios } from '@shared/api/axios';
import { destroyCookie } from 'nookies';

export const login = async (values: LoginFormDto): Promise<LoginResponseDto> => {
  return (await axios.post('/auth/login', values)).data;
};

export const register = async (values: RegisterFormDto): Promise<RegisterResponseDto> => {
  return (await axios.post('/auth/register', values)).data;
};

export const getMe = async (): Promise<UserFormDto> => {
  return (await axios.get('/users/me')).data;
};

export const logOut = async () => {
  destroyCookie(null, '_token', { path: '/' });
};
