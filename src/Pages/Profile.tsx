import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileAvatar from '../Features/ProfileAvatar';
import ProfileFields from '../Features/ProfileFields';
import mainStore from '../store/mainStore';

export const Profile: FC = () => {
  const [imageUrl, setImageUrl] = useState<string>('');

  return (
    <div className='wrapper profile'>
      <div className='profile-wrp'>
        <ProfileAvatar imageUrl={imageUrl} setImageUrl={setImageUrl} />
        <ProfileFields />
      </div>
      <div className='profile-routes'>
        <Link to=''>Маршрутов: {mainStore.user?.routesArray.length}</Link>
      </div>
    </div>
  );
};
