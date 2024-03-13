import { Arrow } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/arrow.css';
import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Observer } from 'mobx-react';
import MapView from '../Features/Map/MapView';
import mainStore from '../store/mainStore';

const Constructor = () => {
  const _plugins = [new Arrow()];

  return (
    <div className='map-container'>
      <MapView zoom={2} />

      <div id='popup' className='ol-popup'>
        <a href='#' id='popup-closer' className='ol-popup-closer'>
          X
        </a>
        <div id='popup-content' className='ol-popup-content'></div>
        <input className='ol-popup-input' id='popup-input' />
        <br />

        <Observer>
          {() =>
            mainStore.imagesArray?.length > 0 ? (
              <>
                <Flicking
                  plugins={_plugins}
                  circular
                  panelsPerView={
                    mainStore.imagesArray?.length > 3 ? 3 : mainStore.imagesArray?.length
                  }>
                  {mainStore.imagesArray.map((image) => (
                    <div key={image.id} className='ol-popup-item'>
                      {/* {image.id} */}
                      <img src={image.source} className='ol-popup-img' />
                    </div>
                  ))}
                </Flicking>
                <span className='flicking-arrow-prev is-thin'></span>
                <span className='flicking-arrow-next is-thin'></span>
              </>
            ) : (
              <></>
            )
          }
        </Observer>
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
      </div>
    </div>
  );
};

export default Constructor;
