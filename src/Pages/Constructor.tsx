import { VectorCustomization } from '@yandex/ymaps3-types';
import { useRef } from 'react';
import {
  YMap,
  YMapComponentsProvider,
  YMapDefaultFeaturesLayer,
  // ...other components
  YMapDefaultSchemeLayer,
} from 'ymap3-components';
import { customization } from '../assets/customization';
import { apiKey } from '../assets/helper';

const Constructor = () => {
  const mapRef = useRef(null);
  return (
    <>
      <div className='map-container'>
        <YMapComponentsProvider apiKey={apiKey} lang='ru_RU'>
          <YMap ref={mapRef} location={{ center: [37.95, 55.65], zoom: 10 }}>
            <YMapDefaultSchemeLayer customization={customization as VectorCustomization} />
            <YMapDefaultFeaturesLayer />
          </YMap>
        </YMapComponentsProvider>
        {/* <div id='popup' className='ol-popup'>
          <a href='#' id='popup-closer' className='ol-popup-closer'>
            X
          </a>
          <div id='popup-content' className='ol-popup-content'></div>
          <input className='ol-popup-input' id='popup-input' />
          <br />
          <PointImages />
          <div className='ol-popup-wrp'>
            <button id='popup-confirm' className='ol-popup-button ol-popup-confirm'>
              Добавить
            </button>
            <button id='popup-cancel' className='ol-popup-button ol-popup-cancel'>
              Отмена
            </button>
          </div>
        </div>
        <div id='marker-popup' className='ol-popup'>
          <a href='#' id='marker-popup-closer' className='ol-popup-closer'>
            X
          </a>
          <p id='marker-popup-content'></p>
        </div> */}
      </div>

      <a id='download' download></a>
      <button>Сохранить</button>
    </>
  );
};

export default Constructor;
