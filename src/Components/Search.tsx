import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const Search = () => {
  const [searchText, setSearchText] = useState<string | undefined>();

  return (
    <div className='search'>
      <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
      <input
        className='search-input'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder='Куда едем?'
      />
    </div>
  );
};

export default Search;
