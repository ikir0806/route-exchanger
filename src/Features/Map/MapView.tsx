import { Feature, Map, Overlay, View } from 'ol';
import apply from 'ol-mapbox-style';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style, Text } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { useEffect, useRef } from 'react';

function MapView({ zoom = 1 }: { zoom?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const myAPIKey = 'd7aaaf2a98e54f60bf270cf3b1836e4c';
  const mapStyle = 'https://maps.geoapify.com/v1/styles/positron/style.json';
  useEffect(() => {
    if (ref.current && !mapRef.current) {
      const setMarkerContainer = document.getElementById('popup') || undefined;
      const getMarkerContainer = document.getElementById('marker-popup') || undefined;
      const content = document.getElementById('popup-content');
      const markerContent = document.getElementById('marker-popup-content');
      const closer = document.getElementById('popup-closer');
      const markerCloser = document.getElementById('marker-popup-closer');
      const confirm = document.getElementById('popup-confirm');
      const cancel = document.getElementById('popup-cancel');

      let markerNumber = 0;

      const raster = new TileLayer({
        source: new OSM(),
      });

      const getIconStyle = () => {
        return new Style({
          image: new CircleStyle({
            radius: 10,
            stroke: new Stroke({ color: 'black', width: 2 }),
            fill: new Fill({ color: 'transparent' }),
          }),
          // image: new Icon({
          //   anchor: [16, 38],
          //   anchorXUnits: 'pixels',
          //   anchorYUnits: 'pixels',

          //   src: icon,
          // }),
          zIndex: 1000,
          fill: new Fill({ color: 'transparent' }),
          text: new Text({
            text: `${markerNumber}`,
            font: 'Normal 15px Raleway',
            fill: new Fill({ color: 'black' }),
            stroke: new Stroke({ color: 'black', width: 2 }),
            offsetY: -1,
            offsetX: 0.3,
          }),
        });
      };

      const overlay = new Overlay({
        element: setMarkerContainer,
        autoPan: {
          animation: {
            duration: 250,
          },
        },
      });

      const markerOverlay = new Overlay({
        element: getMarkerContainer,
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
        overlays: [overlay, markerOverlay],
      });

      let coordinate: Coordinate | null = null;

      mapRef.current?.on('singleclick', (e) => {
        const features = mapRef.current?.getFeaturesAtPixel(e.pixel);
        const feature = features?.find(
          (feature) => Object.getPrototypeOf(feature)?.constructor?.name === '_Feature',
        );
        coordinate = e.coordinate;
        if (feature && markerContent) {
          markerContent.innerHTML = `<p>${feature.getProperties().name}</p>`;
          markerOverlay.setPosition(coordinate);
        } else {
          if (content) content.innerHTML = '<p>Введите название точки маршрута</p>';
          overlay.setPosition(coordinate);
        }
      });

      const addInteraction = (name: string) => {
        if (coordinate) {
          const iconFeature = new Feature({
            geometry: new Point(coordinate),
            name: name,
            population: 4000,
            rainfall: 500,
            id: 'fdgd',
          });
          iconFeature.setStyle(getIconStyle());
          const vectorSource = new VectorSource({
            features: [iconFeature],
          });
          const vectorLayer = new VectorLayer({
            source: vectorSource,
          });
          mapRef.current?.addLayer(vectorLayer);
        }
      };

      const htmlEl = mapRef.current!.getTarget() as HTMLElement;

      mapRef.current?.on('pointermove', function (e) {
        if (e.dragging) return;
        const features = mapRef.current?.getFeaturesAtPixel(e.pixel);
        if (
          features?.some(
            (feature) => Object.getPrototypeOf(feature)?.constructor?.name === '_Feature',
          )
        )
          htmlEl.style.cursor = 'pointer';
        else {
          if (htmlEl.style.cursor === 'pointer') {
            htmlEl.style.cursor = '';
            return;
          }
          return;
        }
      });

      if (confirm)
        confirm.onclick = () => {
          markerNumber++;
          const input = document.getElementById('popup-input') as HTMLInputElement;
          addInteraction(input.value);
          input.value = '';
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

      if (markerCloser)
        markerCloser.onclick = () => {
          markerOverlay.setPosition(undefined);
          markerCloser.blur();
          return false;
        };
      apply(mapRef.current, `${mapStyle}?apiKey=${myAPIKey}`);
    }
  }, [ref, mapRef]);

  useEffect(() => {
    mapRef.current?.getView().setZoom(zoom);
  }, [mapRef, zoom]);
  return <div ref={ref} style={{ width: '100vw', height: '80vh' }} />;
}

export default MapView;
