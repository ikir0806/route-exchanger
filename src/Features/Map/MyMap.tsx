import { apply } from 'ol-mapbox-style';
import Map from 'ol/Map';
import 'ol/ol.css';
import { FC, useEffect, useRef } from 'react';

interface MyMapProps {
  target: string;
}

const MyMap: FC<MyMapProps> = ({ target }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const myAPIKey = 'd7aaaf2a98e54f60bf270cf3b1836e4c';
  const mapStyle = 'https://maps.geoapify.com/v1/styles/positron/style.json';

  useEffect(() => {
    if (mapRef.current) {
      const map = new Map({
        target: target,
      });

      apply(map, `${mapStyle}?apiKey=${myAPIKey}`);
    }
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default MyMap;
