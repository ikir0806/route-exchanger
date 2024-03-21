import { UploadFile } from 'antd';
import { makeAutoObservable } from 'mobx';
interface Result {
  id: string;
  label: string;
}

class MainStore {
  resultsArray: Array<Result> = [
    { id: '1', label: 'Монако' },
    { id: '2', label: 'Чебоксары' },
  ];

  imagesArray: UploadFile[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setResultsArray(array: Array<Result>) {
    this.resultsArray = array;
  }

  setImagesArray(array: UploadFile[]) {
    this.imagesArray = array;
  }
}

const mainStore = new MainStore();
export default mainStore;
