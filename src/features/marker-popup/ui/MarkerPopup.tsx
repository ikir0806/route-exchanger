import mainStore from '@app/store/mainStore';
import { PointImages } from '@features';
import { Observer } from 'mobx-react';
import { FC, useEffect, useState } from 'react';
import { IMarkerPopup } from '../model/marker-popup.model';

export const MarkerPopup: FC<IMarkerPopup> = ({ isEdit }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    setName(mainStore.marker?.name || '');
    setDescription(mainStore.marker?.description || '');
  }, []);

  const clearStorages = () => {
    setName('');
    setDescription('');
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
