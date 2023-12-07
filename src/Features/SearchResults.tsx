import { Observer } from 'mobx-react';
import { FC } from 'react';
import { PuffLoader } from 'react-spinners';
import mainStore from '../store/mainStore';

interface SearchResultsProps {
  loading: boolean | null;
}

const SearchResults: FC<SearchResultsProps> = ({ loading }) => {
  return loading === null ? (
    <></>
  ) : loading ? (
    <div className='spinner'>
      <PuffLoader color='#006d4e' />
    </div>
  ) : (
    <Observer>
      {() =>
        mainStore.resultsArray?.length > 0 ? (
          <li className='route-list'>
            {mainStore.resultsArray?.map((result) => (
              <ul key={result.id} className='route-item'>
                <p>{result.label}</p>
              </ul>
            ))}
          </li>
        ) : (
          <h2 className='route-empty'>К сожалению, ничего не нашлось</h2>
        )
      }
    </Observer>
  );
};

export default SearchResults;
