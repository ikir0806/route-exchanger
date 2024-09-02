import { Observer } from 'mobx-react';
import { FC, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Api from '../api';
import mainStore from '../store/mainStore';
import { AuthContext } from '../utils/AuthContext';

export const ProfileRouter: FC = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    Api.route.findByUser(user.id).then((res) => mainStore.setRoutesArray(res));
  }, []);

  return (
    <div className='profile-routes'>
      <Observer>{() => <Link to=''>Маршрутов: {mainStore.routes.length}</Link>}</Observer>
    </div>
  );
};
