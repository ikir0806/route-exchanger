import { useAppDispatch } from '@app/store/hooks/redux';
import { setImagesOptions } from '@entities';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { ConfigProvider, Upload, message } from 'antd';
import { Observer } from 'mobx-react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const PointImages = ({
  view,
  imagesProp,
  fileList,
  setFileList,
}: {
  view: boolean;
  imagesProp?: UploadFile[];
  fileList?: UploadFile[];
  setFileList?: (filesList: UploadFile[]) => void;
}) => {
  const dispatch = useAppDispatch();

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList && setFileList(newFileList);
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
    dispatch(setImagesOptions(options));
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
            fileList={view ? imagesProp : fileList}>
            {!view && fileList && fileList?.length < 8 && '+ Прикрепить'}
          </Upload>
        </ConfigProvider>
      )}
    </Observer>
  );
};
