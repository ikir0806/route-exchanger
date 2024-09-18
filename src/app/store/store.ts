import {
  authApi,
  avatarApi,
  imageApi,
  imageReducer,
  mapApi,
  markerApi,
  markerReducer,
  resultReducer,
  routeApi,
  routeReducer,
  userApi,
} from '@entities';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  [routeApi.reducerPath]: routeApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [avatarApi.reducerPath]: avatarApi.reducer,
  [imageApi.reducerPath]: imageApi.reducer,
  [mapApi.reducerPath]: mapApi.reducer,
  [markerApi.reducerPath]: markerApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  image: imageReducer,
  marker: markerReducer,
  route: routeReducer,
  result: resultReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        routeApi.middleware,
        authApi.middleware,
        avatarApi.middleware,
        imageApi.middleware,
        mapApi.middleware,
        markerApi.middleware,
        userApi.middleware,
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
