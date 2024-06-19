import axios from 'axios';
import { CreateMarkerDto } from './dto/marker.dto';

export const create = async (values: CreateMarkerDto): Promise<void> => {
  await axios.patch('/markers/create', values);
};
