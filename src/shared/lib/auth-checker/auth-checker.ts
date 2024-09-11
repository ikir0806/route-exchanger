import { auth } from '@entities';
import axios from 'axios';

export class AuthChecker {
  static checkAuth = async () => {
    if (localStorage.getItem('userToken')) {
      const _token = localStorage.getItem('userToken');

      axios.defaults.headers.Authorization = 'Bearer ' + _token;

      try {
        const user = await auth.getMe();
        return user;
      } catch (e) {
        console.log(e);
      }
    }
  };
}
