import MapView from '../Features/Map/MapView';
import PointImages from '../Features/PointImages';

const Constructor = () => {
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
      </div>
    </div>
  );
};

export default Constructor;
