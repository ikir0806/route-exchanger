import { LngLatBounds, VectorCustomization } from '@yandex/ymaps3-types';
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
  YMapZoomControl,
} from 'ymap3-components';
import { customization } from '../../assets/customization';
import { apiKey } from '../../assets/helper';
import mainStore from '../../store/mainStore';
import CustomMarker from './CustomMarker';
import MarkerPopup from './MarkerPopup';

const MapProvider = ({
  bounds,
  setBounds,
}: {
  bounds: LngLatBounds;
  setBounds: (bounds: LngLatBounds) => void;
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <>
      <Observer>
        {() => (
          <YMapComponentsProvider apiKey={apiKey} lang='ru_RU'>
            <YMap
              zoomRounding='smooth'
              location={{
                bounds: bounds,
                duration: 500,
              }}
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
              <YMapZoomControl easing={'ease-in-out'} duration={2000} />
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
                  key={marker.id}
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
                onDblClick={(_, e) => {
                  setBounds([
                    [e.coordinates[0] - 0.3, e.coordinates[1] + 0.3],
                    [e.coordinates[0] + 0.3, e.coordinates[1] - 0.3],
                  ]);
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
