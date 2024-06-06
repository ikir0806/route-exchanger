import { useContext, useState } from 'react';
import { AuthContext } from '../utils/AuthContext';

const ProfileFields = () => {
  const { user } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [login, setLogin] = useState<string | undefined>(user?.login);
  const [description, setDescription] = useState<string | undefined>(user?.description);

  return (
    <>
      <div className='profile-info'>
        {isEdit ? (
          <>
            <input value={login} onChange={(e) => setLogin(e.target.value)} />
            <input value={description} onChange={(e) => setDescription(e.target.value)} />
          </>
        ) : (
          <>
            <h1 className='profile-text profile-login'>{user?.login}</h1>
            <h3 className='profile-text'>{user?.description}</h3>
          </>
        )}
        <div className='action-buttons-wrp'>
          {isEdit ? (
            <>
              <button onClick={() => setIsEdit(false)} className='default-button action-buttons'>
                Отмена
              </button>
              <button
                onClick={() => {
                  setIsEdit(false);
                }}
                className='primary-button action-buttons'>
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
    </>
  );
};

export default ProfileFields;
