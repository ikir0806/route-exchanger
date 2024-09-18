// export * as marker from './api/marker';
export type { CreateMarkerDto } from './model/marker.dto';

export { markerApi, useCreateMarkerMutation } from './api/marker';
export {
  addMarker,
  editMarker,
  markerReducer,
  selectMarkerById,
  setCurrentMarker,
  setMarkers,
} from './model/marker.slice';
