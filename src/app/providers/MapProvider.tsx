import { useAppDispatch, useAppSelector } from '@app/store/hooks/redux';
import { selectMarkerById, setCurrentMarker, setImages } from '@entities';
import { MarkerPopup } from '@features';
import { CustomMarker } from '@shared/components';
import { apiKey, customization } from '@shared/lib/index';
import { LngLatBounds, VectorCustomization } from '@yandex/ymaps3-types';
import { useState } from 'react';
import {
  YMap,
  YMapComponentsProvider,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  YMapListener,
  YMapMarker,
  YMapZoomControl,
} from 'ymap3-components';

const MapProvider = ({
  bounds,
  setBounds,
}: {
  bounds: LngLatBounds;
  setBounds: (bounds: LngLatBounds) => void;
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { currentMarker, markers } = useAppSelector((state) => state.marker);

  return (
    <>
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
          {currentMarker && (
            <YMapMarker
              zIndex={1000}
              coordinates={[
                +currentMarker.coordinates.split(',')[0],
                +currentMarker.coordinates.split(',')[1],
              ]}>
              <MarkerPopup isEdit={isEdit} />
            </YMapMarker>
          )}
          {markers.map((marker) => (
            <YMapMarker
              key={marker.id}
              onClick={(e) => {
                setIsEdit(true);
                const marker = selectMarkerById(
                  {
                    markers,
                    currentMarker,
                  },
                  +(e.target as HTMLButtonElement).innerHTML,
                );
                if (marker) {
                  dispatch(setImages(marker?.images));
                  dispatch(setCurrentMarker(marker));
                }
              }}
              coordinates={[+marker.coordinates.split(',')[0], +marker.coordinates.split(',')[1]]}>
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
              dispatch(
                setCurrentMarker({
                  id: markers.length + 1,
                  images: [],
                  imagesOptions: [],
                  name: '',
                  description: '',
                  coordinates: e.coordinates.toString(),
                }),
              );
            }}
          />
        </YMap>
      </YMapComponentsProvider>
    </>
  );
};

export default MapProvider;
