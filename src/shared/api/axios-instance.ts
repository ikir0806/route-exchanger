import axios from 'axios';
import { parseCookies } from 'nookies';

export const controller = new AbortController();

const instance = axios.create({
  baseURL: 'http://localhost:7777',
  timeout: 30000,
});

instance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const { _token } = parseCookies();
    config.headers.Authorization = 'Bearer ' + _token;
  }

  return config;
});

export default instance;
