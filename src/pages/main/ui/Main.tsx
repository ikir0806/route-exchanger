import { useAppDispatch } from '@app/store/hooks/redux';
import { setResults, useLazyFindByLocationQuery } from '@entities';
import { SearchResults } from '@features';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useEffect, useState } from 'react';

export const Main: FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useAppDispatch();

  const [trigger, { data, isLoading }] = useLazyFindByLocationQuery();

  const loadResults = () => {
    trigger(searchText);
  };

  useEffect(() => {
    if (data && !isLoading) dispatch(setResults(data));
  }, [data, dispatch, isLoading]);

  return (
    <div className='wrapper'>
      <div className='search'>
        <h1 className='search-text white-text'>
          Discover and share amazing routes around the world
        </h1>
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
      <SearchResults loading={isLoading} />
    </div>
  );
};
