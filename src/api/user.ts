import axios from 'axios';
import { UpdateUserFormDto } from './dto/user.dto';

export const update = async (values: UpdateUserFormDto): Promise<void> => {
  await axios.patch('/users/me', values);
};
