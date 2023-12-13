import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD6k2e091FV_27oIB6O_wSilObCcWv3fr0',
  authDomain: 'route-exchanger.firebaseapp.com',
  projectId: 'route-exchanger',
  storageBucket: 'route-exchanger.appspot.com',
  messagingSenderId: '631216790702',
  appId: '1:631216790702:web:36d9ecfc830bc1f259213f',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signUp = async (emal: string, password: string) =>
  await createUserWithEmailAndPassword(auth, emal, password);

export const logIn = async (email: string, password: string) =>
  await signInWithEmailAndPassword(auth, email, password);

export const logOut = async () => await signOut(auth);
