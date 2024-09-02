import axios from 'axios';
import { CreateRouteDto, GetRouteDto } from './dto/route.dto';

export const create = async (values: CreateRouteDto, userId: number): Promise<number> => {
  const res = await axios.post('/routes/create?userId=' + userId, values);
  return res.data.id;
};

export const findByLocation = async (location: string): Promise<GetRouteDto[]> => {
  const result = await axios.get('/routes/findByLocation?location=' + location);
  return result.data;
};

export const findByUser = async (userId: number): Promise<GetRouteDto[]> => {
  const result = await axios.get('/routes/findByUser?userId=' + userId);
  return result.data;
};
