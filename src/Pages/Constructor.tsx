import { ConfigProvider, Input } from 'antd';
import { useContext, useState } from 'react';
import MapProvider from '../Features/Map/MapProvider';
import mainStore from '../store/mainStore';
import { AuthContext } from '../utils/AuthContext';

const Constructor = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState<string>('');
  const [place, setPlace] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const saveRoute = () => {
    console.log({
      id: `${mainStore.routes.length + 1}`,
      name: name,
      place: place,
      description: description,
      markersArray: mainStore.markers,
      author: user?.login,
    });
  };

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
          <h3>Название маршрута</h3>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='route-input'
            allowClear
          />
          <h3>Локация</h3>
          <Input
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className='route-input'
            allowClear
          />
          <h3>Описание маршрута</h3>
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoSize
            className='route-input'
            allowClear
          />
        </div>
      </ConfigProvider>

      <div className='map-container'>
        <MapProvider />
      </div>
      <div className='action-buttons-wrp'>
        <button className='default-button action-buttons'>Выгрузить маршрут</button>
        <button onClick={saveRoute} className='primary-button action-buttons'>
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default Constructor;
