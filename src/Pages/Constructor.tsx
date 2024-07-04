import { ConfigProvider, Input } from 'antd';
import { useContext, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import MapProvider from '../Features/Map/MapProvider';
import * as Api from '../api';
import mainStore from '../store/mainStore';
import { AuthContext } from '../utils/AuthContext';

const Constructor = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const saveRoute = () => {
    if (!user) return;

    setLoading(true);

    Api.route
      .create(
        {
          name: name,
          location: location,
          description: description,
        },
        user?.id,
      )
      .then((res) => {
        mainStore.markers.forEach(async (marker) => {
          await Api.markers
            .create(
              {
                name: marker.name,
                description: marker.description,
                coordinates: marker.coordinates,
              },
              res,
            )
            .then(async (res) => await Api.images.uploadFiles(res, marker.imagesOptionsArray));
          setLoading(false);
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return loading ? (
    <>
      <div style={{ marginTop: '10vh' }} className='spinner'>
        <PuffLoader color='#006d4e' />
      </div>
      <h3 className='spinner-text'>Сохранение маршрута...</h3>
    </>
  ) : (
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
