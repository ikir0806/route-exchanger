import { UserFormDto } from '@entities';

export interface ImageItemDto {
  filename: string;
  originalName: string;
  size: number;
  mimetype: string;
  user: UserFormDto;
  deletedAt: string | null;
  id: number;
}
