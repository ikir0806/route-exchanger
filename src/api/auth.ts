import axios from '../core/axios';
import {
  LoginFormDto,
  LoginResponseDto,
  RegisterFormDto,
  RegisterResponseDto,
} from './dto/auth.dto';

export const login = async (values: LoginFormDto): Promise<LoginResponseDto> => {
  return (await axios.post('/auth/login', values)).data;
};

export const register = async (values: RegisterFormDto): Promise<RegisterResponseDto> => {
  return (await axios.post('/auth/register', values)).data;
};