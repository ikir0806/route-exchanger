import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import SearchResults from '../Features/SearchResults';
import mainStore from '../store/mainStore';

const Main = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean | null>(null);

  const loadResults = () => {
    setLoading(true);
    setTimeout(() => {
      mainStore.setResultsArray(
        mainStore.resultsArray?.filter((item) =>
          item.label.toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <div className='wrapper'>
      <div className='search'>
        <div className='search-form'>
          <input
            onKeyDown={(e) => e.key === 'Enter' && loadResults()}
            className='search-input'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder='Куда едем?'
          />
          {searchText && (
            <button onClick={() => setSearchText('')} className='search-button search-button_clear'>
              <FontAwesomeIcon icon={faXmark} className='search-icon' />
            </button>
          )}
          <button onClick={() => loadResults()} className='search-button'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
          </button>
        </div>
      </div>
      <SearchResults loading={loading} />
    </div>
  );
};

export default Main;
