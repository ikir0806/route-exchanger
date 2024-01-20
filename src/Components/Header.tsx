import { faMap } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

function Header() {
  const { user, setUser } = useContext(AuthContext);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className='header'>
      <Link className='icon' to='/'>
        <FontAwesomeIcon icon={faMap} className='icon-img' />
        <h1 className='white-text'>{/* 𝘛𝘶𝘵𝘰𝘤𝘩𝘬𝘢 */}Tutochka</h1>
      </Link>
      <div className='header-wrp'>
        <Link className='header-item' to='/profile'>
          <h3 className='white-text'>Язык</h3>
          {/* <FontAwesomeIcon icon={faUser} className='profile-img' /> */}
        </Link>
        {!user && (
          <>
            <Link className='header-item' to='/authorization'>
              {/* <FontAwesomeIcon icon={faUser} className='profile-img' /> */}
              <h3 className='white-text'>Авторизация</h3>
            </Link>
            <Link className='header-item' to='/registration'>
              {/* <FontAwesomeIcon icon={faUser} className='profile-img' /> */}
              <h3 className='white-text'>Регистрация</h3>
            </Link>
          </>
        )}
        {user && (
          <div style={{ position: 'relative' }}>
            <button onClick={() => setOpen(true)}>{user?.login}</button>
            <dialog open={open} className='modal-profile'>
              <button onClick={() => setOpen(false)}>X</button>
              <Link className='header-item-profile' to='/profile'>
                {/* <FontAwesomeIcon icon={faUser} className='profile-img' /> */}
                <h3 /* className='green-text' */>Профиль</h3>
              </Link>
              <button
                onClick={() => {
                  setUser(null);
                  localStorage.removeItem('user');
                }}>
                Выйти
              </button>
            </dialog>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
