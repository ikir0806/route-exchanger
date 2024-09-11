import { AuthContext } from '@app/providers/AuthContext';
import mainStore from '@app/store/mainStore';
import { route } from '@entities';
import { Observer } from 'mobx-react';
import { FC, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const ProfileRouter: FC = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    route.findByUser(user.id).then((res) => mainStore.setRoutesArray(res));
  }, []);

  return (
    <div className='profile-routes'>
      <Observer>{() => <Link to=''>Маршрутов: {mainStore.routes.length}</Link>}</Observer>
    </div>
  );
};
