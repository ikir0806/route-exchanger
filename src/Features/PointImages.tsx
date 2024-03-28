import type { GetProp, UploadProps } from 'antd';
import { ConfigProvider, Upload, message } from 'antd';
import { Observer } from 'mobx-react';
import React from 'react';
import mainStore from '../store/mainStore';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const PointImages: React.FC = () => {
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    mainStore.setImagesArray(newFileList);
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.warning('Недопустимый формат файла');
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  return (
    <Observer>
      {() => (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#21605e',
              borderRadius: 20,
              colorBgContainer: '#f2f3f0',
            },
          }}>
          <Upload
            className='popup-images'
            beforeUpload={beforeUpload}
            onChange={onChange}
            listType='picture-card'
            fileList={mainStore.imagesArray}>
            {mainStore.imagesArray?.length < 8 && '+ Прикрепить'}
          </Upload>
        </ConfigProvider>
      )}
    </Observer>
  );
};

export default PointImages;
