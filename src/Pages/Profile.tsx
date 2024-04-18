import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileAvatar from '../Features/ProfileAvatar';
import mainStore from '../store/mainStore';

export const Profile: FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <div className='wrapper profile'>
      <div className='profile-wrp'>
        <ProfileAvatar />
        <div className='profile-info'>
          <h1 className='profile-text profile-login'>{mainStore.user?.name}</h1>
          <h3 className='profile-text'>{mainStore.user?.description}</h3>
        </div>
      </div>
      <div className='profile-routes'>
        <Link to=''>Маршрутов: {mainStore.user?.routesArray.length}</Link>
      </div>
      <div className='action-buttons-wrp'>
        {isEdit ? (
          <>
            <button onClick={() => setIsEdit(false)} className='default-button action-buttons'>
              Отмена
            </button>
            <button onClick={() => setIsEdit(false)} className='primary-button action-buttons'>
              Сохранить
            </button>
          </>
        ) : (
          <button onClick={() => setIsEdit(true)} className='primary-button action-buttons'>
            Редактировать
          </button>
        )}
      </div>
    </div>
  );
};
