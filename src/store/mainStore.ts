import { LngLat } from '@yandex/ymaps3-types';
import { UploadFile } from 'antd';
import { makeAutoObservable } from 'mobx';
interface Result {
  id: string;
  label: string;
}

interface Marker {
  id: number;
  name: string;
  coordinates: LngLat;
  imagesArray: UploadFile[];
}

class MainStore {
  resultsArray: Array<Result> = [
    { id: '1', label: 'Монако' },
    { id: '2', label: 'Чебоксары' },
  ];

  imagesArray: UploadFile[] = [];

  marker: Marker | null = null;

  markers: Marker[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setResultsArray(array: Array<Result>) {
    this.resultsArray = array;
  }

  setImagesArray(array: UploadFile[]) {
    this.imagesArray = array;
  }

  addMarker(marker: Marker) {
    this.markers.push(marker);
  }

  editMarker(changedMarker: Marker) {
    this.markers = this.markers.map((marker) =>
      marker.id === changedMarker.id ? changedMarker : marker,
    );
  }

  setMarker(marker: Marker | null) {
    this.marker = marker;
  }

  getMarker(id: number) {
    return this.markers.find((marker) => marker.id === id);
  }
}

const mainStore = new MainStore();
export default mainStore;
