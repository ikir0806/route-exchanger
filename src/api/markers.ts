import axios from 'axios';
import { CreateMarkerDto } from './dto/marker.dto';

export const createMany = async (values: CreateMarkerDto[], routeId: number): Promise<void> => {
  await axios.patch('/markers/create?routeId' + routeId, values);
};
