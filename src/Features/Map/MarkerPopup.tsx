import { Observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import mainStore from '../../store/mainStore';
import PointImages from '../PointImages';

const MarkerPopup = ({ isEdit }: { isEdit: boolean }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

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
        description: description,
        coordinates: mainStore.marker?.coordinates || '0,0',
        imagesArray: mainStore.imagesArray,
        imagesOptionsArray: mainStore.imagesOptionsArray,
      });
    clearStorages();
  };

  const editMarker = () => {
    mainStore.marker?.coordinates &&
      mainStore.editMarker({
        id: mainStore.marker?.id || mainStore.markers.length + 1,
        name: name,
        description: description,
        coordinates: mainStore.marker?.coordinates || '0,0',
        imagesArray: mainStore.imagesArray,
        imagesOptionsArray: mainStore.imagesOptionsArray,
      });
    clearStorages();
  };

  return (
    <Observer>
      {() => (
        <div id='popup' className='popup'>
          <button onClick={() => mainStore.setMarker(null)} className='popup-closer'>
            X
          </button>
          <input value={name} onChange={(e) => setName(e.target.value)} className='popup-input' />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='popup-input'
          />
          <br />
          <PointImages view={false} />
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
