import { Observer } from 'mobx-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
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
          <div className='card-list'>
            {mainStore.resultsArray?.map((result) => (
              <Link
                onClick={() => mainStore.getRoute(result.id)}
                to={`/view/${result.id}`}
                key={result.id}
                className='card-item'>
                <img src='./moscow.png' className='card-img' />
                <div className='card-info'>
                  <h2>{result.name}</h2>
                  <p>{result.place}</p>
                  <PointImages
                    view
                    imagesArray={Array.prototype.concat(
                      ...result.markersArray.map((marker) => marker.imagesArray),
                    )}
                  />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <h2 className='roucardte-empty'>К сожалению, ничего не нашлось</h2>
        )
      }
    </Observer>
  );
};

export default SearchResults;
