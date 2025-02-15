// export * as image from './api/image';
export type { ImageItemDto } from './model/image.dto';

export {
  imageApi,
  useGetAllImagesQuery,
  useGetImagesByRouteIdQuery,
  useRemoveImageMutation,
  useUploadImagesMutation,
} from './api/image';
export { imageReducer, setImages, setImagesOptions } from './model/image.slice';
