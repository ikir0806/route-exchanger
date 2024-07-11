import { LngLatBounds } from '@yandex/ymaps3-types';
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
  const [bounds, setBounds] = useState<LngLatBounds>([
    [37, 55.75],
    [38, 55.75],
  ]);

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

  function centerMap() {
    const coords = mainStore.markers?.map((marker) => marker.coordinates.split(','));

    // let sumX = 0;
    // let sumY = 0;

    // for (const coord of coords) {
    //   sumX += +coord[0];
    //   sumY += +coord[1];
    // }

    // const centerX = sumX / coords.length;
    // const centerY = sumY / coords.length;

    // setCenter([centerX, centerY]);

    const bounds = coords.reduce(
      (prev, curr) => [
        Math.min(prev[0], +curr[0]),
        Math.max(prev[1], +curr[0]),
        Math.min(prev[2], +curr[1]),
        Math.max(prev[3], +curr[1]),
      ],
      [Number.MAX_VALUE, Number.MIN_VALUE, Number.MAX_VALUE, Number.MIN_VALUE],
    );

    setBounds([
      [bounds[0] - (bounds[1] - bounds[0]) * 0.05, bounds[3] + (bounds[3] - bounds[2]) * 0.05],
      [bounds[1] + (bounds[1] - bounds[0]) * 0.05, bounds[2] - (bounds[3] - bounds[2]) * 0.05],
    ]);
  }

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
        <MapProvider bounds={bounds} setBounds={setBounds} />
      </div>
      <div className='action-buttons-wrp'>
        <button onClick={centerMap} className='default-button action-buttons'>
          Выгрузить маршрут
        </button>
        <button onClick={saveRoute} className='primary-button action-buttons'>
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default Constructor;
