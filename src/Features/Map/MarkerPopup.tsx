import { Observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import mainStore from '../../store/mainStore';
import PointImages from '../PointImages';

const MarkerPopup = ({ isEdit }: { isEdit: boolean }) => {
  const [name, setName] = useState<string>('');

  useEffect(() => setName(mainStore.marker?.name || ''), []);

  const clearStorages = () => {
    setName('');
    mainStore.setImagesArray([]);
    mainStore.setMarker(null);
  };

  const addMarker = () => {
    mainStore.marker?.coordinates &&
      mainStore.addMarker({
        id: mainStore.marker?.id || mainStore.markers.length + 1,
        name: name,
        coordinates: mainStore.marker?.coordinates || [0, 0],
        imagesArray: mainStore.imagesArray,
      });
    clearStorages();
  };

  const editMarker = () => {
    mainStore.marker?.coordinates &&
      mainStore.editMarker({
        id: mainStore.marker?.id || mainStore.markers.length + 1,
        name: name,
        coordinates: mainStore.marker?.coordinates || [0, 0],
        imagesArray: mainStore.imagesArray,
      });
    clearStorages();
  };

  return (
    <Observer>
      {() => (
        <div id='popup' className='ol-popup'>
          <a
            onClick={() => mainStore.setMarker(null)}
            href='#'
            id='popup-closer'
            className='ol-popup-closer'>
            X
          </a>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='ol-popup-input'
          />
          <br />
          <PointImages />
          <div className='ol-popup-wrp'>
            {isEdit ? (
              <button
                id='popup-confirm'
                onClick={editMarker}
                className='ol-popup-button ol-popup-confirm'>
                Изменить
              </button>
            ) : (
              <button
                id='popup-confirm'
                onClick={addMarker}
                className='ol-popup-button ol-popup-confirm'>
                Добавить
              </button>
            )}
            <button
              onClick={() => mainStore.setMarker(null)}
              id='popup-cancel'
              className='ol-popup-button ol-popup-cancel'>
              Отмена
            </button>
          </div>
        </div>
      )}
    </Observer>
  );
};

export default MarkerPopup;
