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
        <div id='popup' className='popup'>
          <a onClick={() => mainStore.setMarker(null)} href='#' className='popup-closer'>
            X
          </a>
          <input value={name} onChange={(e) => setName(e.target.value)} className='popup-input' />
          <br />
          <PointImages />
          <div className='popup-wrp'>
            {isEdit ? (
              <button onClick={editMarker} className='popup-button primary-button'>
                Изменить
              </button>
            ) : (
              <button onClick={addMarker} className='popup-button primary-button'>
                Добавить
              </button>
            )}
            <button
              onClick={() => mainStore.setMarker(null)}
              className='popup-button default-button'>
              Отмена
            </button>
          </div>
        </div>
      )}
    </Observer>
  );
};

export default MarkerPopup;
