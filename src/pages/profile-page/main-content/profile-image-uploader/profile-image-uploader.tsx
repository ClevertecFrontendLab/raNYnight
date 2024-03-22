import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { baseQuery } from '@constants/api';
import { BREAKPOINT_520 } from '@constants/breakpoints';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useProfileFormContext } from '@hooks/useProfileFormContext';
import { selectAuthToken } from '@redux/auth/auth-slice';
import { Button, Form, Upload, UploadFile } from 'antd';
import { UploadFileStatus, UploadProps } from 'antd/lib/upload/interface';
import { useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import './profile-image-uploader.less';

const ProfileImageUploader = () => {
    const token = useAppSelector(selectAuthToken);

    const { width } = useWindowSize();
    const form = useProfileFormContext();

    const imageUrl = form?.getFieldValue('imgSrc');

    console.log('imageUrl', imageUrl);
    console.log('form', form);

    const defaultFile = {
        uid: '1',
        name: 'image.png',
        url: imageUrl,
    };

    const [uploadFileList, setUploadFileList] = useState<UploadFile[]>(
        imageUrl ? [defaultFile] : [],
    );

    const isDesktop = width > BREAKPOINT_520;

    const listType = isDesktop ? 'picture-card' : 'picture';

    const shouldShowPreview = uploadFileList[0] ? true : false;

    const handleChange: UploadProps['onChange'] = ({ fileList }: { fileList: UploadFile[] }) => {
        setUploadFileList(fileList);

        const uploadedFile = fileList[0];

        if (uploadedFile.error?.status === 'error') {
            const errorFile = {
                ...defaultFile,
                name: uploadedFile.name,
                url: '',
                status: 'error' as UploadFileStatus,
            };

            setUploadFileList([errorFile]);
        }

        if (uploadedFile.error?.status === 409) {
            console.log('open notify modal file is BIG');
        }
    };

    const UploadButton = ({ isDesktop }: { isDesktop: boolean }) =>
        isDesktop ? (
            <button className='avatar-uploader' type='button'>
                <PlusOutlined />
                <div className=''>Загрузить фото профиля</div>
            </button>
        ) : (
            <div className='avatar-uploader-mobile'>
                <span>Загрузить фото профиля:</span>
                <Button icon={<UploadOutlined />}>Загрузить</Button>
            </div>
        );

    return (
        <div className='photo-uploader'>
            <Form.Item name='imgSrc'>
                <Upload
                    name='imgSrc'
                    maxCount={1}
                    action={`${baseQuery}upload-image`}
                    listType={listType}
                    fileList={uploadFileList}
                    accept='image/*'
                    onChange={handleChange}
                    headers={{ Authorization: `Bearer ${token}` }}
                    progress={{ strokeWidth: 4, showInfo: false, size: 'default' }}
                >
                    {!shouldShowPreview && <UploadButton isDesktop={isDesktop} />}
                </Upload>
            </Form.Item>
        </div>
    );
};
export default ProfileImageUploader;
