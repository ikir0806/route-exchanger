import { ConfigProvider, Input } from 'antd';
import MapProvider from '../Features/Map/MapProvider';

const Constructor = () => {
  return (
    <div className='wrapper constructor'>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#21605e',
            borderRadius: 20,
            colorBgContainer: '#f2f3f0',
          },
        }}>
        <div className='constructor-wrp'>
          <h3>Название маршрута</h3>
          <Input className='constructor-input' allowClear />
          <h3>Описание маршрута</h3>
          <Input.TextArea autoSize className='constructor-input' allowClear />
        </div>
      </ConfigProvider>

      <div className='map-container'>
        <MapProvider />
      </div>

      <a id='download' download></a>
      <button>Сохранить</button>
    </div>
  );
};

export default Constructor;
