import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Route } from '@shared/models';

export interface RouteState {
  routes: Route[];
  currentRoute: Route | null;
}

export const initialState: RouteState = {
  routes: [],
  currentRoute: null,
};

export const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    addRoute: (state, action: PayloadAction<Route>) => {
      state.routes.push(action.payload);
    },
    setRoutes: (state, action: PayloadAction<Route[]>) => {
      state.routes = action.payload;
    },
    setCurrentRoute: (state, action: PayloadAction<Route | null>) => {
      state.currentRoute = action.payload;
    },
  },
});

export const { addRoute, setRoutes, setCurrentRoute } = routeSlice.actions;

export const routeReducer = routeSlice.reducer;

export const selectRouteById = (state: RouteState, id: number) => {
  return state.routes.find((route) => route.id === id) || null;
};
