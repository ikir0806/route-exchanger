import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps } from 'antd';
import { ConfigProvider, Upload, message } from 'antd';
import { Observer } from 'mobx-react';
import { FC, useContext, useEffect, useState } from 'react';

import { AuthContext } from '@app/providers/AuthContext';
import { avatar } from '@entities';
import { ImageChecker } from '@shared/lib/image-checker/image-checker';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const ProfileAvatar: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    avatar.get(user.id).then((res) => {
      const ext = res?.filename.split('.').pop();
      const imageUrl =
        ext && ImageChecker.isImage(ext)
          ? 'http://localhost:7777/uploads/avatars/' + res?.filename
          : '';
      return setImageUrl(imageUrl);
    });
  }, []);

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      console.log(info.file);
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const beforeUpload = (file: FileType) => {
    setLoading(true);
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.warning('Недопустимый формат файла');
    }
    return isJpgOrPng || Upload.LIST_IGNORE;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUploadSuccess = async (options: any) => {
    if (!user) return;

    try {
      if (imageUrl) {
        await avatar.remove(user.id).then(async () => await avatar.uploadFile(user.id, options));
      } else {
        await avatar.uploadFile(user.id, options);
      }

      // window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type='button'>
      {loading ? (
        <LoadingOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      ) : (
        <PlusOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      )}
      <div
        style={{
          marginTop: 8,
        }}>
        Upload
      </div>
    </button>
  );

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
            showUploadList={false}
            accept='.png, .jpg'
            className='avatar'
            beforeUpload={beforeUpload}
            onChange={handleChange}
            listType='picture-card'>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt='avatar'
                style={{
                  width: '100%',
                  maxWidth: '50vw',
                  maxHeight: '50vh',
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </ConfigProvider>
      )}
    </Observer>
  );
};
