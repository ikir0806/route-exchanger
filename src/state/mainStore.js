import { makeAutoObservable } from 'mobx';

class MainStore {
  constructor() {
    makeAutoObservable(this);
  }
}

const mainStore = new MainStore();
export default mainStore;
