import { Marker } from '@shared/models';

export interface Route {
  id: number;
  author: string;
  location: string;
  name: string;
  mapFilename: string;
  description: string;
  markersArray?: Marker[];
}
