import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  useGetAvatarQuery,
  useRemoveAvatarMutation,
  UserFormDto,
  useUploadAvatarMutation,
} from '@entities';
import { ImageChecker } from '@shared/lib/image-checker/image-checker';
import type { GetProp, UploadProps } from 'antd';
import { ConfigProvider, message, Upload } from 'antd';
import { useEffect, useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const ProfileAvatar = ({ user }: { user: UserFormDto }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const [uploadAvatar] = useUploadAvatarMutation();
  const [removeAvatar] = useRemoveAvatarMutation();
  const { data, isLoading, isError, refetch } = useGetAvatarQuery(user.id);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const ext = data.filename.split('.').pop();
      setImageUrl(
        ext && ImageChecker.isImage(ext)
          ? 'http://localhost:7777/uploads/avatars/' + data.filename
          : '',
      );
    }
  }, [isLoading, isError, data]);

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
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
        await removeAvatar(user.id).then(
          async () => await uploadAvatar({ userId: user.id, options }).then(() => refetch()),
        );
      } else {
        await uploadAvatar({ userId: user.id, options }).then(() => refetch());
      }
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
  );
};
