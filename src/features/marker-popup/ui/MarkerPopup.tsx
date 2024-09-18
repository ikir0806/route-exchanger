import { useAppDispatch, useAppSelector } from '@app/store/hooks/redux';
import { addMarker, editMarker, setCurrentMarker, setImages } from '@entities';
import { PointImages } from '@features';
import { UploadFile } from 'antd';
import { useState } from 'react';

export const MarkerPopup = ({ isEdit }: { isEdit: boolean }) => {
  const { currentMarker, markers } = useAppSelector((state) => state.marker);
  const { imagesOptions } = useAppSelector((state) => state.image);
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>(currentMarker?.name || '');
  const [description, setDescription] = useState<string>(currentMarker?.description || '');
  const [fileList, setFileList] = useState<UploadFile[]>(currentMarker?.images || []);

  const clearStorages = () => {
    setName('');
    setDescription('');
    dispatch(setImages([]));
    dispatch(setCurrentMarker(null));
    setFileList([]);
  };

  const addCurrentMarker = () => {
    currentMarker?.coordinates &&
      dispatch(
        addMarker({
          id: currentMarker?.id || markers.length + 1,
          name: name,
          description: description,
          coordinates: currentMarker?.coordinates || '0,0',
          images: fileList,
          imagesOptions: imagesOptions,
        }),
      );
    clearStorages();
  };

  const editCurrentMarker = () => {
    currentMarker?.coordinates &&
      dispatch(
        editMarker({
          id: currentMarker?.id || markers.length + 1,
          name: name,
          description: description,
          coordinates: currentMarker?.coordinates || '0,0',
          images: fileList,
          imagesOptions: imagesOptions,
        }),
      );
    clearStorages();
  };

  return (
    <div id='popup' className='popup'>
      <button onClick={() => dispatch(setCurrentMarker(null))} className='popup-closer'>
        X
      </button>
      <input value={name} onChange={(e) => setName(e.target.value)} className='popup-input' />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='popup-input'
      />
      <br />
      <PointImages view={false} fileList={fileList} setFileList={setFileList} />
      <div className='popup-wrp'>
        {isEdit ? (
          <button onClick={editCurrentMarker} className='popup-button primary-button'>
            Изменить
          </button>
        ) : (
          <button onClick={addCurrentMarker} className='popup-button primary-button'>
            Добавить
          </button>
        )}
        <button
          onClick={() => dispatch(setCurrentMarker(null))}
          className='popup-button default-button'>
          Отмена
        </button>
      </div>
    </div>
  );
};
