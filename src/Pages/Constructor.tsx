import { Map, View } from 'ol';
import apply from 'ol-mapbox-style';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { useEffect, useRef } from 'react';
// import './styles.css';

function MapView({ zoom = 1 }: { zoom?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const myAPIKey = 'd7aaaf2a98e54f60bf270cf3b1836e4c';
  const mapStyle = 'https://maps.geoapify.com/v1/styles/positron/style.json';
  useEffect(() => {
    if (ref.current && !mapRef.current) {
      mapRef.current = new Map({
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({ center: [0, 0], zoom: 1 }),
        target: ref.current,
        overlays: [
          // {
          //   position: fromLonLat([16.3725, 48.208889]),
          //   positioning: 'bottom-right',
          //   element: document.getElementById('marker'),
          //   stopEvent: false,
          // },
        ],
      });
      apply(mapRef.current, `${mapStyle}?apiKey=${myAPIKey}`);
    }
  }, [ref, mapRef]);

  useEffect(() => {
    mapRef.current?.getView().setZoom(zoom);
  }, [mapRef, zoom]);

  return <div ref={ref} style={{ width: '90vw', height: '80vh' }} />;
}

export default function Constructor() {
  return (
    <div className='map-container'>
      <MapView zoom={2} />
    </div>
  );
}
