import { UpdateUserFormDto } from '@entities';
import axios from 'axios';

export const update = async (values: UpdateUserFormDto): Promise<void> => {
  await axios.patch('/users/me', values);
};
