import { VectorCustomization } from '@yandex/ymaps3-types';
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

  return (
    <>
      <Observer>
        {() => (
          <YMapComponentsProvider apiKey={apiKey} lang='ru_RU'>
            <YMap
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
                <YMapMarker zIndex={1000} coordinates={mainStore.marker.coordinates}>
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
    </>
  );
};

export default MapProvider;
