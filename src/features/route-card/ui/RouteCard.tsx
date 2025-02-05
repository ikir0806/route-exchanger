import { useAppDispatch, useAppSelector } from '@app/store/hooks/redux';
import {
  selectRouteById,
  setCurrentRoute,
  setMarkers,
  useGetImagesByRouteIdQuery,
} from '@entities';
import { Route } from '@shared/models';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import { FULL_DATE_OPTIONS } from '@shared/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';

export const RouteCard = ({ route }: { route: Route }) => {
  const { currentRoute, routes } = useAppSelector((state) => state.route);
  const dispatch = useAppDispatch();

  const { data } = useGetImagesByRouteIdQuery(route.id);
  console.log(route);

  return (
    <Link
      onClick={() => {
        const newRoute = selectRouteById(
          {
            routes,
            currentRoute,
          },
          route.id,
        );
        dispatch(setCurrentRoute(newRoute));
        route?.markersArray && dispatch(setMarkers(route.markersArray));
      }}
      to={`/view/${route.id}`}
      key={route.id}
      className='card-item'>
      <img src={`http://localhost:7777/uploads/maps/${route.mapFilename}`} className='card-map' />
      <div className='card-info'>
        <h2>{route.name}</h2>
        <p>{route.location}</p>
        <Row gutter={[16, 24]} className='card-row'>
          {data?.map((image: string) => {
            return (
              <Col className='card-col' span={6}>
                <img src={`http://localhost:7777/uploads/images/${image}`} className='card-img' />
              </Col>
            );
          })}
        </Row>
        <div className='card-footer'>
          <div className='card-footer-wrp'>
            <FontAwesomeIcon icon={faUser} className='card-footer-img' />
            <p>{route.username}</p>
          </div>
          <div className='card-footer-wrp'>
            <FontAwesomeIcon icon={faCalendar} className='card-footer-img' />
            <p>{new Date(route.createdDate).toLocaleDateString('ru-RU', FULL_DATE_OPTIONS)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
