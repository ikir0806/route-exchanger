import { LngLatBounds } from '@yandex/ymaps3-types';
import { ConfigProvider, Input } from 'antd';
import { Feature } from 'ol';
import apply from 'ol-mapbox-style';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { Point } from 'ol/geom';
import { Tile as TileLayer, Vector, Vector as VectorLayer } from 'ol/layer.js';
import { fromLonLat } from 'ol/proj';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Fill, Stroke, Style, Text } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { useContext, useEffect, useRef, useState } from 'react';
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
  const mapRef = useRef<Map | null>(null);

  const myAPIKey = 'd7aaaf2a98e54f60bf270cf3b1836e4c';
  const mapStyle = 'https://maps.geoapify.com/v1/styles/positron/style.json';

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

    Api.route
      .create(
        {
          name: name,
          location: location,
          description: description,
        },
        user?.id,
      )
      .then(async (routeId) => {
        mainStore.markers.forEach(async (marker) => {
          await Api.markers
            .create(
              {
                name: marker.name,
                description: marker.description,
                coordinates: marker.coordinates,
              },
              routeId,
            )
            .then(async (res) => await Api.images.uploadFiles(res, marker.imagesOptionsArray));
        });
        await getImage(routeId);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  async function getImage(routeId: number | null) {
    const width = 1200;
    const height = 600;
    const viewResolution = mapRef.current?.getView().getResolution();

    const getIconStyle = (id?: number) => {
      return new Style({
        image: new CircleStyle({
          radius: 10,
          stroke: new Stroke({ color: '#21605e', width: 2 }),
          fill: new Fill({ color: 'transparent' }),
        }),
        zIndex: 1000,
        fill: new Fill({ color: 'transparent' }),
        text: new Text({
          text: `${id}`,
          font: 'Normal 15px Raleway',
          fill: new Fill({ color: '#071111' }),
          stroke: new Stroke({ color: '#071111', width: 1 }),
          offsetY: -1,
          offsetX: 0.3,
        }),
      });
    };

    const vectorSource = new VectorSource();
    const vectorLayer = new Vector({
      source: vectorSource,
    });

    for (let i = 0; i < mainStore.markers.length; i++) {
      vectorLayer
        ?.getSource()
        ?.addFeature(
          createMarker(
            mainStore.markers[i].coordinates.split(',')?.[0],
            mainStore.markers[i].coordinates.split(',')?.[1],
            mainStore.markers[i].id,
          ),
        );
    }

    function createMarker(lng: string, lat: string, id: number) {
      const iconFeature = new Feature({
        geometry: new Point(fromLonLat([parseFloat(lng), parseFloat(lat)])),
        id: id,
      });
      iconFeature.setStyle(getIconStyle(id));
      return iconFeature;
    }

    mapRef.current?.addLayer(vectorLayer);

    const extent = vectorSource.getExtent();
    mapRef.current?.getView().fit(extent, { padding: [5, 5, 5, 5] });

    mapRef.current?.once('rendercomplete', async function () {
      const mapCanvas = document.createElement('canvas');
      mapCanvas.width = width;
      mapCanvas.height = height;
      const mapContext = mapCanvas.getContext('2d');
      if (!mapContext) return;
      Array.prototype.forEach.call(
        document.querySelectorAll('.ol-layer canvas'),
        function (canvas) {
          if (canvas.width > 0) {
            const opacity = canvas.parentNode.style.opacity;
            mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
            const transform = canvas.style.transform;
            const matrix = transform
              .match(/^matrix\(([^(]*)\)$/)[1]
              .split(',')
              .map(Number);
            CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
            mapContext?.drawImage(canvas, 0, 0);
          }
        },
      );
      mapContext.globalAlpha = 1;
      mapContext?.setTransform(1, 0, 0, 1, 0, 0);

      if (!routeId) {
        const link = document.createElement('a');
        link.download = 'filename.png';
        link.href = mapCanvas.toDataURL('image/jpeg');
        link.click();
        return;
      }

      mapCanvas.toBlob(async (blob) => {
        if (!blob || !user) {
          return;
        }
        const file = new File([blob], 'map-image.png', { type: 'image/png' });

        try {
          await Api.map.uploadFile(routeId, file);
        } catch (error) {
          console.error('Upload failed', error);
        }
      }, 'image/png');
    });

    const printSize = [width, height];
    mapRef.current?.setSize(printSize);
    const scaling = Math.min(width / 1200, height / 600);
    viewResolution && mapRef.current?.getView().setResolution(viewResolution / scaling);
  }

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
        <button onClick={() => getImage(null)} className='default-button action-buttons'>
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

export default Constructor;
