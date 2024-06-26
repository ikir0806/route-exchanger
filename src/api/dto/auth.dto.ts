export interface LoginFormDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
}

export type RegisterFormDto = LoginFormDto & { login: string };

export type RegisterResponseDto = LoginResponseDto;
