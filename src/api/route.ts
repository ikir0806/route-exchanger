import axios from 'axios';
import { CreateRouteDto } from './dto/route.dto';

export const create = async (values: CreateRouteDto): Promise<void> => {
  await axios.patch('/routes/create', values);
};
