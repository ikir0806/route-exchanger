import { addMap, uploadFile, UserFormDto } from '@entities';
import { Marker } from '@shared/models';
import { Feature } from 'ol';
import Map from 'ol/Map.js';
import { Point } from 'ol/geom';
import { Vector } from 'ol/layer.js';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorSource } from 'ol/source.js';
import { Fill, Stroke, Style, Text } from 'ol/style';
import CircleStyle from 'ol/style/Circle';

export class ImageCreator {
  static createImage = async (
    routeId: number | null,
    mapRef: Map | null,
    user: UserFormDto,
    markers: Marker[],
  ): Promise<void> => {
    // Добавляем Promise<void>
    const width = 1200;
    const height = 600;
    const viewResolution = mapRef?.getView().getResolution();

    const getIconStyle = (id?: number) => {
      return new Style({
        image: new CircleStyle({
          radius: 10,
          stroke: new Stroke({ color: '#21605e', width: 2 }),
          fill: new Fill({ color: 'transparent' }),
        }),
        zIndex: 1000,
        fill: new Fill({ color: 'transparent' }),
        text: new Text({
          text: `${id}`,
          font: 'Normal 15px Raleway',
          fill: new Fill({ color: '#071111' }),
          stroke: new Stroke({ color: '#071111', width: 1 }),
          offsetY: -1,
          offsetX: 0.3,
        }),
      });
    };

    const vectorSource = new VectorSource();
    const vectorLayer = new Vector({
      source: vectorSource,
    });

    for (let i = 0; i < markers.length; i++) {
      vectorLayer
        ?.getSource()
        ?.addFeature(
          createMarker(
            markers[i].coordinates.split(',')?.[0],
            markers[i].coordinates.split(',')?.[1],
            markers[i].id,
          ),
        );
    }

    function createMarker(lng: string, lat: string, id: number) {
      const iconFeature = new Feature({
        geometry: new Point(fromLonLat([parseFloat(lng), parseFloat(lat)])),
        id: id,
      });
      iconFeature.setStyle(getIconStyle(id));
      return iconFeature;
    }

    mapRef?.addLayer(vectorLayer);

    const extent = vectorSource.getExtent();
    mapRef?.getView().fit(extent, { padding: [5, 5, 5, 5] });

    return new Promise<void>((resolve, reject) => {
      // Оборачиваем в Promise
      mapRef?.once('rendercomplete', async function () {
        const mapCanvas = document.createElement('canvas');
        mapCanvas.width = width;
        mapCanvas.height = height;
        const mapContext = mapCanvas.getContext('2d');
        if (!mapContext) return reject(new Error('Failed to get canvas context'));

        Array.prototype.forEach.call(
          document.querySelectorAll('.ol-layer canvas'),
          function (canvas) {
            if (canvas.width > 0) {
              const opacity = canvas.parentNode.style.opacity;
              mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
              const transform = canvas.style.transform;
              const matrix = transform
                .match(/^matrix\(([^(]*)\)$/)[1]
                .split(',')
                .map(Number);
              CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
              mapContext?.drawImage(canvas, 0, 0);
            }
          },
        );

        mapContext.globalAlpha = 1;
        mapContext?.setTransform(1, 0, 0, 1, 0, 0);

        if (!routeId) {
          const link = document.createElement('a');
          link.download = 'filename.png';
          link.href = mapCanvas.toDataURL('image/jpeg');
          link.click();
          return resolve(); // Завершаем Promise
        }

        mapCanvas.toBlob(async (blob) => {
          if (!blob || !user) {
            return reject(new Error('Blob or user is not defined'));
          }
          const file = new File([blob], 'map-image.png', { type: 'image/png' });

          try {
            await uploadFile(routeId, file).then((res) => addMap(res.filename, routeId));
            resolve();
          } catch (error) {
            console.error('Upload failed', error);
            reject(error);
          }
        }, 'image/png');
      });

      const printSize = [width, height];
      mapRef?.setSize(printSize);
      const scaling = Math.min(width / 1200, height / 600);
      viewResolution && mapRef?.getView().setResolution(viewResolution / scaling);
    });
  };
}
