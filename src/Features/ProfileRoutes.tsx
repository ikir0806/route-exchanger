import { FC } from 'react';
import { Link } from 'react-router-dom';
import mainStore from '../store/mainStore';

export const ProfileRouter: FC = () => {
  return (
    <div className='profile-routes'>
      <Link to=''>Маршрутов: {mainStore.user?.routesArray.length}</Link>
    </div>
  );
};
