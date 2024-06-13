import { UserFormDto } from './user.dto';

export interface ImageItem {
  filename: string;
  originalName: string;
  size: number;
  mimetype: string;
  user: UserFormDto;
  deletedAt: string | null;
  id: number;
}
