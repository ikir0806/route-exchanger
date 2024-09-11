import { AuthContext } from '@app/providers/AuthContext';
import { auth } from '@entities';
import { faMap } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useContext, useState } from 'react';
import { Link } from 'react-router-dom';

export const Header: FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const [open, setOpen] = useState<boolean>(false);
  const dialogRef = React.createRef<HTMLDialogElement>();

  return (
    <div className='header'>
      <Link className='icon' to='/'>
        <FontAwesomeIcon icon={faMap} className='icon-img' />
        <h1 /* className='white-text' */>{/* 𝘛𝘶𝘵𝘰𝘤𝘩𝘬𝘢 */}Tutochka</h1>
      </Link>
      <div className='header-wrp'>
        <Link className='header-item' to='/profile'>
          <h3 onMouseEnter={() => console.log(user)} /* className='white-text' */>Язык</h3>
          {/* <FontAwesomeIcon icon={faUser} className='profile-img' /> */}
        </Link>
        {!user && (
          <>
            <Link className='header-item header-enter' to='/authorization'>
              {/* <FontAwesomeIcon icon={faUser} className='profile-img' /> */}
              <h3 className='white-text'>Войти</h3>
            </Link>
          </>
        )}
        {user && (
          <div style={{ position: 'relative' }}>
            <button className='header-user' onClick={() => setOpen(true)}>
              <h3>{user?.login}</h3>
            </button>
            <div
              onClick={(e) =>
                !dialogRef.current?.contains(e.target as HTMLElement) && setOpen(false)
              }
              className={`modal-backdrop ${open ? '' : 'hidden'}`}>
              <dialog ref={dialogRef} open={open} className='modal-profile'>
                <button className='modal-profile-close' onClick={() => setOpen(false)}>
                  X
                </button>
                <Link onClick={() => setOpen(false)} className='modal-profile-link' to='/profile'>
                  {/* <FontAwesomeIcon icon={faUser} className='profile-img' /> */}
                  <h3 className='modal-profile-link-text'>Профиль</h3>
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  className='modal-profile-link'
                  to='/constructor'>
                  {/* <FontAwesomeIcon icon={faUser} className='profile-img' /> */}
                  <h3 className='modal-profile-link-text'>Конструктор маршрутов</h3>
                </Link>
                <button
                  className='modal-profile-logout'
                  onClick={() => {
                    setUser && setUser(null);
                    auth.logOut();
                    localStorage.removeItem('userToken');
                  }}>
                  Выйти
                </button>
              </dialog>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
