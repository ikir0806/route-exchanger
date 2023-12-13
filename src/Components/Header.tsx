import { faMap } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function Header() {
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
        <Link className='header-item' to='/authorization'>
          {/* <FontAwesomeIcon icon={faUser} className='profile-img' /> */}
          <h3 className='white-text'>Авторизация</h3>
        </Link>
        <Link className='header-item' to='/registration'>
          {/* <FontAwesomeIcon icon={faUser} className='profile-img' /> */}
          <h3 className='white-text'>Регистрация</h3>
        </Link>
        <Link className='header-item' to='/profile'>
          {/* <FontAwesomeIcon icon={faUser} className='profile-img' /> */}
          <h3 className='white-text'>Профиль</h3>
        </Link>
      </div>
    </div>
  );
}

export default Header;
