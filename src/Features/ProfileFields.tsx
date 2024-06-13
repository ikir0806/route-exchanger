import { ConfigProvider, Input } from 'antd';
import { useContext, useState } from 'react';
import * as Api from '../api';
import { AuthContext } from '../utils/AuthContext';
import { checkAuth } from '../utils/checkAuth';

const ProfileFields = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [login, setLogin] = useState<string | undefined>(user?.login);
  const [description, setDescription] = useState<string | undefined>(user?.description);

  const onSave = () => {
    if (!user) return;

    Api.user
      .update({
        id: user.id,
        login: login || user.login,
        description: description || user?.description || '',
      })
      .then(() => {
        checkAuth()
          .then((data) => data && setUser(data))
          .catch((e) => console.error(e));
      });
  };

  return (
    <>
      <div className='profile-info'>
        {isEdit ? (
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#21605e',
                borderRadius: 20,
                colorBgContainer: '#fefefe',
              },
            }}>
            <Input
              value={login}
              placeholder='Имя пользователя'
              className='profile-fields'
              onChange={(e) => setLogin(e.target.value)}
            />
            <Input.TextArea
              value={description}
              placeholder='Описаниие'
              className='profile-fields profile-fields-description'
              onChange={(e) => setDescription(e.target.value)}
            />
          </ConfigProvider>
        ) : (
          <>
            <h1 className='profile-text'>{user?.login}</h1>
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
                  onSave();
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
