import { FC } from 'react';
import { Link } from 'react-router-dom';
import ProfileAvatar from '../Features/ProfileAvatar';
import ProfileFields from '../Features/ProfileFields';
import mainStore from '../store/mainStore';

export const Profile: FC = () => {
  return (
    <div className='wrapper profile'>
      <div className='profile-wrp'>
        <ProfileAvatar />
        <ProfileFields />
      </div>
      <div className='profile-routes'>
        <Link to=''>Маршрутов: {mainStore.user?.routesArray.length}</Link>
      </div>
    </div>
  );
};
