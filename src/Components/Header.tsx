import { faMap } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='header'>
      <Link className='icon' to='/'>
        <FontAwesomeIcon icon={faMap} className='icon-img' />
        <h1 className='icon-text'>Router</h1>
      </Link>
      <Link className='profile' to='/profile'>
        <FontAwesomeIcon icon={faUser} className='profile-img' />
      </Link>
    </div>
  );
}

export default Header;
