import { ConfigProvider } from 'antd';
import { toJS } from 'mobx';
import { useContext } from 'react';
import MapProvider from '../Features/Map/MapProvider';
import mainStore from '../store/mainStore';
import { AuthContext } from '../utils/AuthContext';

const View = () => {
  const { user } = useContext(AuthContext);

  console.log(toJS(mainStore.route?.description));

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
          <h1>{mainStore.route?.name}</h1>
          <h3 className='route-author'>{user?.login}</h3>
          <h3>{mainStore.route?.place}</h3>
          <h3 className='route-descr'>{mainStore.route?.description}</h3>
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

export default View;
