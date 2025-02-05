import { useAppSelector } from '@app/store/hooks/redux';
import { RouteCard } from '@features';
import { PuffLoader } from 'react-spinners';

export const SearchResults = ({ loading }: { loading: boolean | null }) => {
  const { results } = useAppSelector((state) => state.result);

  return loading === null ? (
    <></>
  ) : loading ? (
    <div style={{ marginTop: '10vh' }} className='spinner'>
      <PuffLoader color='#006d4e' />
    </div>
  ) : results.length > 0 ? (
    <div className='card-list'>
      {results.map((result) => (
        <RouteCard route={result} />
      ))}
    </div>
  ) : (
    <h2 className='card-empty'>К сожалению, ничего не нашлось</h2>
  );
};
