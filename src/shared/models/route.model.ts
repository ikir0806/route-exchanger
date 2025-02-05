import { Marker } from '@shared/models';

export interface Route {
  id: number;
  username: string;
  location: string;
  name: string;
  mapFilename: string;
  description: string;
  markersArray?: Marker[];
  createdDate: string;
  updatedDate: string;
}
