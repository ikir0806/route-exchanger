import type { GetProp, UploadFile, UploadProps } from 'antd';
import { ConfigProvider, Upload, message } from 'antd';
import { Observer } from 'mobx-react';
import { useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const ProfileAvatar = () => {
  const [image, setImage] = useState<UploadFile[]>([]);
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setImage(newFileList);
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
            className='avatar'
            beforeUpload={beforeUpload}
            onChange={onChange}
            listType='picture-card'
            fileList={image}>
            {image.length === 0 && '+ Прикрепить'}
          </Upload>
        </ConfigProvider>
      )}
    </Observer>
  );
};

export default ProfileAvatar;
