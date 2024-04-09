import { Observer } from 'mobx-react';
import { FC } from 'react';
import { PuffLoader } from 'react-spinners';
import mainStore from '../store/mainStore';
import PointImages from './PointImages';

interface SearchResultsProps {
  loading: boolean | null;
}

const SearchResults: FC<SearchResultsProps> = ({ loading }) => {
  return loading === null ? (
    <></>
  ) : loading ? (
    <div style={{ marginTop: '10vh' }} className='spinner'>
      <PuffLoader color='#006d4e' />
    </div>
  ) : (
    <Observer>
      {() =>
        mainStore.resultsArray?.length > 0 ? (
          <li className='route-list'>
            {mainStore.resultsArray?.map((result) => (
              <ul key={result.id} className='route-item'>
                <img src='./moscow.png' className='route-img' />
                <div className='route-info'>
                  <h2>{result.name}</h2>
                  <p>{result.place}</p>
                  <PointImages
                    view
                    imagesArray={Array.prototype.concat(
                      ...result.markersArray.map((marker) => marker.imagesArray),
                    )}
                  />
                </div>
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
