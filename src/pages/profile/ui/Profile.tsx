import { AuthContext } from '@app/providers/AuthContext';
import { ProfileAvatar, ProfileFields, ProfileRoutes } from '@features';
import { FC, useContext } from 'react';

export const Profile: FC = () => {
  const { user } = useContext(AuthContext);

  return user ? (
    <div className='wrapper profile'>
      <div className='profile-wrp'>
        <ProfileAvatar user={user} />
        <ProfileFields />
      </div>
      <ProfileRoutes user={user} />
    </div>
  ) : (
    <></>
  );
};
