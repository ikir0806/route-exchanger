import { LngLat, VectorCustomization } from '@yandex/ymaps3-types';
import { Observer } from 'mobx-react';
import { useState } from 'react';
import {
  YMap,
  YMapComponentsProvider,
  YMapDefaultFeaturesLayer,
  // ...other components
  YMapDefaultSchemeLayer,
  YMapListener,
  YMapMarker,
} from 'ymap3-components';
import { customization } from '../../assets/customization';
import { apiKey } from '../../assets/helper';
import mainStore from '../../store/mainStore';
import CustomMarker from './CustomMarker';
import MarkerPopup from './MarkerPopup';

const MapProvider = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [center, setCenter] = useState<LngLat>([37.95, 55.65]);

  async function createMap() {
    await ymaps3.ready;

    const { YMap } = ymaps3;

    const map = new YMap(document.querySelector('.map'), {
      location: {
        center: [37.95, 55.65],
        zoom: 16,
      },
    });

    console.log(map.zoom);

    map.setLocation({ center: [0, 0], zoom: 5 });

    // map.setLocation({
    //   bounds: [
    //     [37, 55],
    //     [38, 55],
    //   ],
    // });
  }

  return (
    <>
      <Observer>
        {() => (
          <YMapComponentsProvider apiKey={apiKey} lang='ru_RU'>
            <YMap
              className='map'
              location={{ center: center, zoom: 10 }}
              behaviors={[
                'drag',
                'pinchZoom',
                'scrollZoom',
                'magnifier',
                'oneFingerZoom',
                'mouseRotate',
                'mouseTilt',
                'panTilt',
                'pinchRotate',
              ]}>
              <YMapDefaultSchemeLayer customization={customization as VectorCustomization} />
              <YMapDefaultFeaturesLayer />
              {mainStore.marker && (
                <YMapMarker
                  zIndex={1000}
                  coordinates={[
                    +mainStore.marker.coordinates.split(',')[0],
                    +mainStore.marker.coordinates.split(',')[1],
                  ]}>
                  <MarkerPopup isEdit={isEdit} />
                </YMapMarker>
              )}
              {mainStore.markers?.map((marker) => (
                <YMapMarker
                  onClick={(e) => {
                    setIsEdit(true);
                    const marker = mainStore.getMarker(+(e.target as HTMLButtonElement).innerHTML);
                    marker && mainStore.setImagesArray(marker?.imagesArray);
                    marker && mainStore.setMarker(marker);
                  }}
                  coordinates={[
                    +marker.coordinates.split(',')[0],
                    +marker.coordinates.split(',')[1],
                  ]}>
                  <CustomMarker num={marker.id} />
                </YMapMarker>
              ))}
              <YMapListener
                layer='any'
                onClick={() => createMap()}
                onDblClick={(_, e) => {
                  console.log(e.coordinates);
                  setCenter(e.coordinates);
                  // setIsEdit(false);
                  mainStore.setMarker({
                    id: mainStore.markers.length + 1,
                    imagesArray: [],
                    imagesOptionsArray: [],
                    name: '',
                    description: '',
                    coordinates: e.coordinates.toString(),
                  });
                }}
              />
            </YMap>
          </YMapComponentsProvider>
        )}
      </Observer>
    </>
  );
};

export default MapProvider;
