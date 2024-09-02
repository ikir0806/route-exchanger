import { UploadFile } from 'antd';
import { makeAutoObservable } from 'mobx';

interface Route {
  id: number;
  author: string;
  location: string;
  name: string;
  description: string;
  markersArray?: Marker[];
}

interface Marker {
  id: number;
  name: string;
  description: string;
  coordinates: string;
  imagesArray: UploadFile[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imagesOptionsArray: any;
}

interface User {
  id: string;
  name: string;
  email: string;
  description: string;
  isOrg: boolean;
  routesArray: Route[];
}

class MainStore {
  resultsArray: Array<Route> = [];

  imagesArray: UploadFile[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imagesOptionsArray: any = [];

  marker: Marker | null = null;

  markers: Marker[] = [];

  routes: Route[] = [];

  route: Route | null = null;

  user: User | null = {
    id: '1',
    name: 'Kirill Makarov',
    email: 'kirill@gmail.com',
    description:
      'Шапка профиля — это первое, на что смотрит пользователь в вашем аккаунте. По первым строчкам человек понимает, что это за страница и интересна ли она ему, поэтому важно грамотно оформить описание и кратко презентовать бренд посетителю.',
    routesArray: this.routes,
    isOrg: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  getResultsArray(filter: string) {
    this.resultsArray = this.routes?.filter(
      (route) =>
        route.name.toLowerCase().includes(filter.toLowerCase()) ||
        route.location.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  setResultsArray(array: Array<Route>) {
    this.resultsArray = array;
  }

  setImagesArray(array: UploadFile[]) {
    this.imagesArray = array;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setImagesOptionsArray(array: any) {
    this.imagesOptionsArray.push(array);
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

  addRoute(route: Route) {
    this.routes.push(route);
  }

  getRoute(id: number) {
    this.route = this.routes.find((route) => route.id === id) || null;
    this.markers = this.route?.markersArray || [];
  }

  setRoutesArray(routesArray: Route[]) {
    this.routes = routesArray;
  }

  afterSaving() {
    this.marker = null;
    this.markers = [];
    this.imagesArray = [];
    this.imagesOptionsArray = [];
    this.routes = [];
  }
}

const mainStore = new MainStore();
export default mainStore;
