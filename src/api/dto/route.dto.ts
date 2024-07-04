export interface CreateRouteDto {
  name: string;
  description: string;
  location: string;
}

export type GetRouteDto = CreateRouteDto & { id: number };
