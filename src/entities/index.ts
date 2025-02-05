// export { auth } from './auth/index';
// export { avatar } from './avatar/index';
// export { image } from './image/index';
// export { map } from './map/index';
// export { marker } from './marker/index';
// export { route } from './route/index';
// export { user } from './user/index';

export type {
  LoginFormDto,
  LoginResponseDto,
  RegisterFormDto,
  RegisterResponseDto,
} from './auth/index';
export type { ImageItemDto } from './image/index';
export type { CreateMarkerDto } from './marker/index';
export type { CreateRouteDto, GetRouteDto } from './route/index';
export type { UpdateUserFormDto, UserFormDto } from './user/index';

export { imageReducer, setImages, setImagesOptions } from './image';
export {
  addMarker,
  editMarker,
  markerReducer,
  selectMarkerById,
  setCurrentMarker,
  setMarkers,
} from './marker';
export { resultReducer, setResults } from './result';
export { addRoute, routeReducer, selectRouteById, setCurrentRoute, setRoutes } from './route';

export { authApi, getMe, useLogOutMutation, useLoginMutation, useRegisterMutation } from './auth';
export {
  avatarApi,
  useGetAvatarQuery,
  useRemoveAvatarMutation,
  useUploadAvatarMutation,
} from './avatar';
export {
  imageApi,
  useGetAllImagesQuery,
  useGetImagesByRouteIdQuery,
  useRemoveImageMutation,
  useUploadImagesMutation,
} from './image';
export { mapApi, uploadFile, useGetMapQuery, useRemoveMapMutation } from './map';
export { markerApi, useCreateMarkerMutation } from './marker';
export {
  addMap,
  routeApi,
  useCreateRouteMutation,
  useFindByLocationQuery,
  useFindByUserQuery,
  useLazyFindByLocationQuery,
  useLazyFindByUserQuery,
} from './route';
export { useUpdateUserMutation, userApi } from './user';
