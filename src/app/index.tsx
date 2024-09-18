import { setupStore } from '@app/store/store';
import { Authorization, Constructor, Main, Profile, Registration, View } from '@pages';
import { Footer, Header } from '@widgets';
import { useContext } from 'react';
import { Provider } from 'react-redux';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { AuthContext, AuthProvider } from './providers/AuthContext';
import './styles/App.scss';

const store = setupStore();

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to='/' replace />;

  return <Outlet />;
};

const App = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route element={<PrivateRoutes />}>
            <Route path='profile' element={<Profile />} />
            <Route path='constructor' element={<Constructor />} />
            <Route path='view/:id' element={<View />} />
          </Route>
          <Route path='authorization' element={<Authorization />} />
          <Route path='registration' element={<Registration />} />
          {/* <Route path='/' element={<Header />}><Route index element={<MainPage />} /></Route> */}
          {/* <Route path='*' element={<h2>404 page</h2>} /> */}
        </Routes>
        <Footer />
      </Provider>
    </AuthProvider>
  );
};

export default App;
