import { VectorCustomization } from '@yandex/ymaps3-types';
import { Observer } from 'mobx-react';
import { useRef, useState } from 'react';
import {
  YMap,
  YMapComponentsProvider,
  YMapDefaultFeaturesLayer,
  // ...other components
  YMapDefaultSchemeLayer,
  YMapListener,
  YMapMarker,
} from 'ymap3-components';
import CustomMarker from '../Features/Map/CustomMarker';
import MarkerPopup from '../Features/Map/MarkerPopup';
import { customization } from '../assets/customization';
import { apiKey } from '../assets/helper';
import mainStore from '../store/mainStore';

const Constructor = () => {
  const mapRef = useRef(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <>
      <div className='map-container'>
        <Observer>
          {() => (
            <YMapComponentsProvider apiKey={apiKey} lang='ru_RU'>
              <YMap
                ref={mapRef}
                location={{ center: [37.95, 55.65], zoom: 10 }}
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
                  <YMapMarker coordinates={mainStore.marker.coordinates}>
                    <MarkerPopup isEdit={isEdit} />
                  </YMapMarker>
                )}
                {mainStore.markers?.map((marker) => (
                  <YMapMarker
                    onClick={(e) => {
                      setIsEdit(true);
                      const marker = mainStore.getMarker(
                        +(e.target as HTMLButtonElement).innerHTML,
                      );
                      marker && mainStore.setImagesArray(marker?.imagesArray);
                      marker && mainStore.setMarker(marker);
                    }}
                    coordinates={marker.coordinates}>
                    <CustomMarker num={marker.id} />
                  </YMapMarker>
                ))}
                <YMapListener
                  layer='any'
                  onDblClick={(_, e) => {
                    setIsEdit(false);
                    mainStore.setMarker({
                      id: mainStore.markers.length + 1,
                      imagesArray: [],
                      name: '',
                      coordinates: e.coordinates,
                    });
                  }}
                />
              </YMap>
            </YMapComponentsProvider>
          )}
        </Observer>
      </div>

      <a id='download' download></a>
      <button>Сохранить</button>
    </>
  );
};

export default Constructor;
