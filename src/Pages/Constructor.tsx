import MapProvider from '../Features/Map/MapProvider';

const Constructor = () => {
  return (
    <>
      <div className='map-container'>
        <MapProvider />
      </div>

      <a id='download' download></a>
      <button>Сохранить</button>
    </>
  );
};

export default Constructor;
