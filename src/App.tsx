import { Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Authorization from './Pages/Authorization';
import Main from './Pages/Main';
import { Profile } from './Pages/Profile';
import Registration from './Pages/Registration';
import './scss/App.scss';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='profile' element={<Profile />} />
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
    </>
  );
}

export default App;
