import axios from 'axios';
import { CreateRouteDto } from './dto/route.dto';

export const create = async (values: CreateRouteDto, userId: number): Promise<number> => {
  const res = await axios.post('/routes/create?userId=' + userId, values);
  return res.data.id;
};
