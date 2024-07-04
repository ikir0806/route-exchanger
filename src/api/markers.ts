import axios from 'axios';
import { CreateMarkerDto } from './dto/marker.dto';

export const create = async (value: CreateMarkerDto, routeId: number): Promise<number> => {
  const res = await axios.post('/markers/create?routeId=' + routeId, value);
  return res.data.id;
};
