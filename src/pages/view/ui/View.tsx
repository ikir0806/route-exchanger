import { AuthContext } from '@app/providers/AuthContext';
import MapProvider from '@app/providers/MapProvider';
import { useAppSelector } from '@app/store/hooks/redux';
import { ConfigProvider } from 'antd';
import { FC, useContext } from 'react';

export const View: FC = () => {
  const { user } = useContext(AuthContext);
  const { currentRoute } = useAppSelector((state) => state.route);

  return (
    <div className='wrapper route'>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#21605e',
            borderRadius: 20,
            colorBgContainer: '#fefefe',
          },
        }}>
        <div className='route-wrp'>
          <h1>{currentRoute?.name}</h1>
          <h3 className='route-author'>{user?.login}</h3>
          <h3>{currentRoute?.location}</h3>
          <h3 className='route-descr'>{currentRoute?.description}</h3>
        </div>
      </ConfigProvider>

      <div className='map-container'>
        <MapProvider />
      </div>
      <div className='route-buttons-wrp'>
        <button className='default-button route-buttons'>Выгрузить маршрут</button>
      </div>
    </div>
  );
};
