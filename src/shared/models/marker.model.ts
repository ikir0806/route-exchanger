import { UploadFile } from 'antd';

export interface Marker {
  id: number;
  name: string;
  description: string;
  coordinates: string;
  images: UploadFile[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imagesOptions: any;
}
