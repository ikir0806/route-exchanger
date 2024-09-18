import { Marker } from '@shared/models';

export interface Route {
  id: number;
  author: string;
  location: string;
  name: string;
  description: string;
  markersArray?: Marker[];
}
