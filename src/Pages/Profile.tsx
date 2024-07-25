import { FC } from 'react';
import ProfileAvatar from '../Features/ProfileAvatar';
import ProfileFields from '../Features/ProfileFields';
import { ProfileRouter } from '../Features/ProfileRoutes';

export const Profile: FC = () => {
  return (
    <div className='wrapper profile'>
      <div className='profile-wrp'>
        <ProfileAvatar />
        <ProfileFields />
      </div>
      <ProfileRouter />
    </div>
  );
};
