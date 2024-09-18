import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Route } from '@shared/models';

export interface ResultState {
  results: Route[];
}

export const initialState: ResultState = {
  results: [],
};

export const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    setResults: (state, action: PayloadAction<Route[]>) => {
      state.results = action.payload;
    },
  },
});

export const { setResults } = resultSlice.actions;

export const resultReducer = resultSlice.reducer;
