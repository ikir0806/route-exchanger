import { useFindByUserQuery, UserFormDto } from '@entities';
import { Route } from '@shared/models';
import { Link } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { RouteCard } from '@features';

export const ProfileRoutes = ({ user }: { user: UserFormDto }) => {
  const { data, isLoading } = useFindByUserQuery(user?.id);

  return isLoading ? (
    <div style={{ marginTop: '10vh' }} className='spinner'>
      <PuffLoader color='#006d4e' />
    </div>
  ) : (
    <div className='profile-routes'>
      <Link to=''>Маршрутов: {data?.length}</Link>
      <div className='card-list'>
        {data.map((route: Route) => (
          <RouteCard route={route} />
        ))}
      </div>
    </div>
  );
};
