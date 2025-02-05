import { AuthContext } from '@app/providers/AuthContext';
import MapProvider from '@app/providers/MapProvider';
import { useAppSelector } from '@app/store/hooks/redux';
import {
  useCreateMarkerMutation,
  useCreateRouteMutation,
  useUploadImagesMutation,
} from '@entities';
import { LngLatBounds } from '@yandex/ymaps3-types';
import { ConfigProvider, Input } from 'antd';
import apply from 'ol-mapbox-style';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { ImageCreator } from '../lib/ImageCreator';

export const Constructor: FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [bounds, setBounds] = useState<LngLatBounds>([
    [37, 55.75],
    [38, 55.75],
  ]);
  const mapRef = useRef<Map | null>(null);

  const [createRoute] = useCreateRouteMutation();
  const [createMarker] = useCreateMarkerMutation();
  const [uploadImages] = useUploadImagesMutation();

  const myAPIKey = 'd7aaaf2a98e54f60bf270cf3b1836e4c';
  const mapStyle = 'https://maps.geoapify.com/v1/styles/positron/style.json';

  const { markers } = useAppSelector((state) => state.marker);

  useEffect(() => {
    const raster = new TileLayer({
      source: new OSM(),
    });

    const vector = new VectorLayer({
      source: new VectorSource({
        features: [],
      }),
      opacity: 0.5,
    });

    const map = new Map({
      layers: [raster, vector],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    mapRef.current = map;

    apply(mapRef.current, `${mapStyle}?apiKey=${myAPIKey}`);
  }, []);

  const saveRoute = () => {
    if (!user) return;

    setLoading(true);

    createRoute({
      values: {
        name: name,
        location: location,
        description: description,
        username: user.login,
      },
      userId: user.id,
    })
      .then(async (routeId) => {
        routeId.data &&
          markers.forEach(async (resultMarker) => {
            await createMarker({
              value: {
                name: resultMarker.name,
                description: resultMarker.description,
                coordinates: resultMarker.coordinates,
              },
              routeId: routeId.data,
            }).then(
              async (res) =>
                res.data &&
                (await uploadImages({
                  markerId: res.data,
                  options: resultMarker.imagesOptions,
                  routeId: routeId.data,
                })),
            );
          });
        routeId.data &&
          (await ImageCreator.createImage(routeId.data, mapRef.current, user, markers));
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  function centerMap() {
    const coords = markers?.map((marker) => marker.coordinates.split(','));

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
          <img src='' />
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
          Центрировать карту
        </button>
        <button
          onClick={() => user && ImageCreator.createImage(null, mapRef.current, user, markers)}
          className='default-button action-buttons'>
          Выгрузить маршрут
        </button>
        <button onClick={saveRoute} className='primary-button action-buttons'>
          Сохранить
        </button>
      </div>
      <div id='map' className='map'></div>
      {loading && (
        <div className='loader'>
          <div style={{ marginTop: '10vh' }} className='spinner'>
            <PuffLoader color='#006d4e' />
          </div>
          <h3 className='spinner-text white-text'>Сохранение маршрута...</h3>
        </div>
      )}
    </div>
  );
};
