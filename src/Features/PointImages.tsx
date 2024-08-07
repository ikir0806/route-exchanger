import type { GetProp, UploadFile, UploadProps } from 'antd';
import { ConfigProvider, Upload, message } from 'antd';
import { Observer } from 'mobx-react';
import mainStore from '../store/mainStore';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const PointImages = ({ view, imagesArray }: { view: boolean; imagesArray?: UploadFile[] }) => {
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

export default PointImages;
