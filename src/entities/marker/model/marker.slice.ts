// markerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Marker } from '@shared/models';

export interface MarkerState {
  currentMarker: Marker | null;
  markers: Marker[];
}

export const initialState: MarkerState = {
  currentMarker: null,
  markers: [],
};

export const markerSlice = createSlice({
  name: 'marker',
  initialState,
  reducers: {
    setCurrentMarker: (state, action: PayloadAction<Marker | null>) => {
      state.currentMarker = action.payload;
    },
    addMarker: (state, action: PayloadAction<Marker>) => {
      state.markers.push(action.payload);
    },
    editMarker: (state, action: PayloadAction<Marker>) => {
      state.markers = state.markers.map((marker) =>
        marker.id === action.payload.id ? action.payload : marker,
      );
    },
    setMarkers: (state, action: PayloadAction<Marker[]>) => {
      state.markers = action.payload;
    },
  },
});

export const { setCurrentMarker, addMarker, editMarker, setMarkers } = markerSlice.actions;

export const markerReducer = markerSlice.reducer;

export const selectMarkerById = (state: MarkerState, id: number) => {
  return state.markers.find((marker) => marker.id === id) || null;
};
