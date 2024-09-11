import { ProfileAvatar, ProfileFields, ProfileRouter } from '@features';
import { FC } from 'react';

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
