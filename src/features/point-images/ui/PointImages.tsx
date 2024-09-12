import mainStore from '@app/store/mainStore';
import type { GetProp, UploadProps } from 'antd';
import { ConfigProvider, Upload, message } from 'antd';
import { Observer } from 'mobx-react';
import { FC } from 'react';
import { IPointImages } from '../model/point-images.model';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const PointImages: FC<IPointImages> = ({ view, imagesArray }) => {
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    mainStore.setImagesArray(newFileList);
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.warning('Недопустимый формат файла');
    }
    return isJpgOrPng || Upload.LIST_IGNORE;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUploadSuccess = async (options: any) => {
    mainStore.setImagesOptionsArray(options);
    const { onSuccess } = options;
    onSuccess();
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
            customRequest={onUploadSuccess}
            disabled={view}
            className='popup-images'
            beforeUpload={beforeUpload}
            onChange={onChange}
            listType='picture-card'
            fileList={view ? imagesArray : mainStore.imagesArray}>
            {!view && mainStore.imagesArray?.length < 8 && '+ Прикрепить'}
          </Upload>
        </ConfigProvider>
      )}
    </Observer>
  );
};