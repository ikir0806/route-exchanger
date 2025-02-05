export interface CreateRouteDto {
  name: string;
  description: string;
  location: string;
  username: string;
}

export type GetRouteDto = CreateRouteDto & { id: number };
