import axios from 'axios';
import * as Api from '../api';

export const checkAuth = async () => {
  if (localStorage.getItem('userToken')) {
    const _token = localStorage.getItem('userToken');

    axios.defaults.headers.Authorization = 'Bearer ' + _token;

    try {
      const user = await Api.auth.getMe();
      return user;
    } catch (e) {
      console.log(e);
    }
  }
};
