import Footer from './Components/Footer';
import Header from './Components/Header';
import Search from './Components/Search';
import './scss/App.scss';

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <Search />
      <Footer />
    </div>
  );
}

export default App;
