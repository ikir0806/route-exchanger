import { Map, Overlay, View } from 'ol';
import apply from 'ol-mapbox-style';
import Draw from 'ol/interaction/Draw.js';
import Interaction from 'ol/interaction/Interaction';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { useEffect, useRef } from 'react';
// import './styles.css';

function MapView({ zoom = 1 }: { zoom?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const myAPIKey = 'd7aaaf2a98e54f60bf270cf3b1836e4c';
  const mapStyle = 'https://maps.geoapify.com/v1/styles/positron/style.json';
  useEffect(() => {
    if (ref.current && !mapRef.current) {
      const container = document.getElementById('popup') || undefined;
      const content = document.getElementById('popup-content');
      const closer = document.getElementById('popup-closer');

      const raster = new TileLayer({
        source: new OSM(),
      });

      const source = new VectorSource({ wrapX: false });
      const vector = new VectorLayer({
        source: source,
        style: {
          'fill-color': 'rgba(255, 255, 255, 0.2)',
          'stroke-color': '#ffcc33',
          'stroke-width': 2,
          'circle-radius': 7,
          'circle-fill-color': '#ffcc33',
        },
      });

      const overlay = new Overlay({
        element: container,
        autoPan: {
          animation: {
            duration: 250,
          },
        },
      });

      if (closer) {
        closer.onclick = function () {
          overlay.setPosition(undefined);
          closer.blur();
          return false;
        };
      }

      mapRef.current = new Map({
        layers: [raster, vector],
        view: new View({ center: [0, 0], zoom: 1 }),
        target: ref.current,
        overlays: [overlay],
      });

      mapRef.current.on('singleclick', (e) => {
        console.log(e);
        const coordinate = e.coordinate;
        const hdms = toStringHDMS(toLonLat(coordinate));
        if (content) content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
        overlay.setPosition(coordinate);
      });

      const typeSelect = 'Point';

      let draw: null | Draw | Interaction = null; // global so we can remove it later

      const addInteraction = () => {
        draw = new Draw({
          source: source,
          type: typeSelect,
        });
        mapRef.current?.addInteraction(draw);
      };

      addInteraction();

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
      </div>
    </div>
  );
}
