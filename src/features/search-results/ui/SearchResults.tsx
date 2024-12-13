import { useAppDispatch, useAppSelector } from '@app/store/hooks/redux';
import { selectRouteById, setCurrentRoute, setMarkers } from '@entities';
import { PointImages } from '@features';
import { Link } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

export const SearchResults = ({ loading }: { loading: boolean | null }) => {
  const { currentRoute, routes } = useAppSelector((state) => state.route);
  const { results } = useAppSelector((state) => state.result);
  const dispatch = useAppDispatch();

  return loading === null ? (
    <></>
  ) : loading ? (
    <div style={{ marginTop: '10vh' }} className='spinner'>
      <PuffLoader color='#006d4e' />
    </div>
  ) : results.length > 0 ? (
    <div className='card-list'>
      {results.map((result) => (
        <Link
          onClick={() => {
            const route = selectRouteById(
              {
                routes,
                currentRoute,
              },
              result.id,
            );
            dispatch(setCurrentRoute(route));
            route?.markersArray && dispatch(setMarkers(route.markersArray));
          }}
          to={`/view/${result.id}`}
          key={result.id}
          className='card-item'>
          <img
            src={`http://localhost:7777/uploads/maps/${result.mapFilename}`}
            className='card-img'
          />
          <div className='card-info'>
            <h2>{result.name}</h2>
            <p>{result.location}</p>
            {result.markersArray && (
              <PointImages
                view
                imagesProp={Array.prototype.concat(
                  ...result.markersArray.map((marker) => marker.images),
                )}
              />
            )}
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <h2 className='card-empty'>К сожалению, ничего не нашлось</h2>
  );
};
