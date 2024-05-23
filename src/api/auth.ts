import axios from '../core/axios';
import { LoginFormDto, LoginResponseDto } from './dto/auth.dto';

export const login = async (values: LoginFormDto): Promise<LoginResponseDto> => {
  return (await axios.post('/auth/login', values)).data;
};
