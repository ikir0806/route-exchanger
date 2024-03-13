import { makeAutoObservable } from 'mobx';
interface Result {
  id: string;
  label: string;
}

interface Image {
  id: string;
  source: string;
}

class MainStore {
  resultsArray: Array<Result> = [
    { id: '1', label: 'Монако' },
    { id: '2', label: 'Чебоксары' },
  ];

  imagesArray: Array<Image> = [
    { id: '1', source: '/monako1.jpg' },
    { id: '2', source: '/monako2.jpg' },
    { id: '3', source: '/monako1.jpg' },
    { id: '4', source: '/monako2.jpg' },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  setResultsArray(array: Array<Result>) {
    this.resultsArray = array;
  }

  setImagesArray(array: Array<Image>) {
    this.imagesArray = array;
  }
}

const mainStore = new MainStore();
export default mainStore;
