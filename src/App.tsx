import { useContext } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Authorization from './Pages/Authorization';
import { Constructor } from './Pages/Constructor';
import Main from './Pages/Main';
import { Profile } from './Pages/Profile';
import Registration from './Pages/Registration';
import './scss/App.scss';
import { AuthContext, AuthProvider } from './utils/AuthContext';

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to='/authorization' replace />;

  return <Outlet />;
};

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route element={<PrivateRoutes />}>
          <Route path='profile' element={<Profile />} />
          <Route path='constructor' element={<Constructor />} />
        </Route>
        <Route path='authorization' element={<Authorization />} />
        <Route path='registration' element={<Registration />} />
        {/* <Route path='/' element={<Header />}>
        <Route index element={<MainPage />} />
      </Route>

      <Route path='*' element={<h2>404 page</h2>} /> */}
        {/* <Route
                    path="profile"
                    element={<PrivateRoute component={<Profile />} />}
                /> */}
        {/* <Route path="about" element={<AboutWithConnect />} /> */}
        {/* <Route path="signin" element={<PublicRoute component={<SignIn />} />} /> */}
        {/* <Route path="signup" element={<SignUp />} /> */}
        {/* <Route path="routeConstructor" element={<PrivateRoute />}>
                    <Route
                        index
                        element={<RouteConstructor />}
                    />
                </Route> */}
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
