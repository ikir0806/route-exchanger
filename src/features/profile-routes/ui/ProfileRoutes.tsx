import { useFindByUserQuery, UserFormDto } from '@entities';
import { Link } from 'react-router-dom';

export const ProfileRoutes = ({ user }: { user: UserFormDto }) => {
  const { data } = useFindByUserQuery(user?.id);

  return (
    <div className='profile-routes'>
      <Link to=''>Маршрутов: {data?.length}</Link>
    </div>
  );
};
