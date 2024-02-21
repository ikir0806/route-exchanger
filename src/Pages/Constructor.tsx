import { Feature, Map, Overlay, View } from 'ol';
import apply from 'ol-mapbox-style';
import { Coordinate, toStringHDMS } from 'ol/coordinate';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { toLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Fill, Icon, Stroke, Style, Text } from 'ol/style';
import { useEffect, useRef } from 'react';
import icon from '../assets/images/marker.svg';
// import './styles.css';

function MapView({ zoom = 1 }: { zoom?: number }) {
  // const [coordinate, setCoordinate] = useState<Coordinate | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const myAPIKey = 'd7aaaf2a98e54f60bf270cf3b1836e4c';
  const mapStyle = 'https://maps.geoapify.com/v1/styles/positron/style.json';
  useEffect(() => {
    if (ref.current && !mapRef.current) {
      const container = document.getElementById('popup') || undefined;
      const content = document.getElementById('popup-content');
      const closer = document.getElementById('popup-closer');
      const confirm = document.getElementById('popup-confirm');
      const cancel = document.getElementById('popup-cancel');

      const raster = new TileLayer({
        source: new OSM(),
      });

      const iconStyle = new Style({
        image: new Icon({
          anchor: [16, 38],
          anchorXUnits: 'pixels',
          anchorYUnits: 'pixels',

          src: icon,
        }),
        text: new Text({
          text: '1',
          font: 'Normal 15px Raleway',
          fill: new Fill({ color: 'black' }),
          stroke: new Stroke({ color: 'black', width: 2 }),
          offsetY: -18,
          offsetX: 0.5,
        }),
      });

      const overlay = new Overlay({
        element: container,
        autoPan: {
          animation: {
            duration: 250,
          },
        },
      });

      mapRef.current = new Map({
        layers: [raster],
        view: new View({ center: [0, 0], zoom: 1 }),
        target: ref.current,
        overlays: [overlay],
      });

      let coordinate: Coordinate | null = null;

      mapRef.current?.on('singleclick', (e) => {
        coordinate = e.coordinate;
        const hdms = toStringHDMS(toLonLat(coordinate));
        if (content) content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
        overlay.setPosition(coordinate);
      });

      const addInteraction = () => {
        if (coordinate) {
          const iconFeature = new Feature({
            geometry: new Point(coordinate),
          });
          iconFeature.setStyle(iconStyle);
          const vectorSource = new VectorSource({
            features: [iconFeature],
          });
          const vectorLayer = new VectorLayer({
            source: vectorSource,
          });
          mapRef.current?.addLayer(vectorLayer);
        }
      };

      if (confirm)
        confirm.onclick = () => {
          addInteraction();
          overlay.setPosition(undefined);
          closer?.blur();
          return false;
        };

      if (cancel)
        cancel.onclick = () => {
          overlay.setPosition(undefined);
          closer?.blur();
          return false;
        };

      if (closer)
        closer.onclick = () => {
          overlay.setPosition(undefined);
          closer.blur();
          return false;
        };

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
      <div id='popup' className='ol-popup'>
        <a href='#' id='popup-closer' className='ol-popup-closer'>
          X
        </a>
        <div id='popup-content'></div>
        <button id='popup-confirm' className='ol-popup-confirm'>
          Добавить
        </button>
        <button id='popup-cancel' className='ol-popup-cancel'>
          Отмена
        </button>
      </div>
    </div>
  );
}
