import { CreateMarkerDto } from '@entities';
import axios from 'axios';

export const create = async (value: CreateMarkerDto, routeId: number): Promise<number> => {
  const res = await axios.post('/markers/create?routeId=' + routeId, value);
  return res.data.id;
};
