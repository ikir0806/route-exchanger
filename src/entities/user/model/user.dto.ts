export interface UserFormDto {
  id: number;
  email: string;
  description: string;
  login: string;
}

export interface UpdateUserFormDto {
  id: number;
  description: string;
  login: string;
}
