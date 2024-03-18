import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Modal, Typography, notification } from 'antd';
import { FC, useEffect, useState } from 'react';

import './notification-modal.less';
import { DATA_TEST_ID } from '@constants/data-test-id';

type NotificationModalProps = {
    textButton: string;
    title: string;
    isCloseIcon: boolean;
    type: 'warning' | 'error';
    open: boolean;
    onClose?: () => void;
    onClickButton: () => void;
    subtitle?: string;
};

export const NotificationModal: FC<NotificationModalProps> = ({
    open,
    onClickButton,
    onClose,
    title,
    isCloseIcon,
    type,
    subtitle,
    textButton,
}) => {
    const [openModal, setOpenModal] = useState(true);

    const openNotification = () => {
        const key = 'open';

        notification.open({
            message: (
                <Typography.Title data-test-id={DATA_TEST_ID.modalErrorUserTrainingTitle} level={5}>
                    {title}
                </Typography.Title>
            ),
            description: (
                <Typography.Text
                    data-test-id={DATA_TEST_ID.modalErrorUserTrainingSubtitle}
                    type='secondary'
                >
                    {subtitle}
                </Typography.Text>
            ),
            btn: (
                <Button
                    type='primary'
                    size='middle'
                    onClick={onClickButton}
                    data-test-id={DATA_TEST_ID.modalErrorUserTrainingButton}
                >
                    {textButton}
                </Button>
            ),
            key,
            icon: (
                <CloseCircleOutlined
                    className={type === 'warning' ? 'warning-icon' : 'error-icon'}
                />
            ),
            duration: 0,
            closeIcon: isCloseIcon ? (
                <CloseOutlined data-test-id={DATA_TEST_ID.modalErrorUserTrainingButtonClose} />
            ) : null,
            onClose,
            className: 'notification-wrapper',
            placement: 'topRight',
        });
    };

    useEffect(() => {
        if (open && !openModal) {
            openNotification();
            return;
        }
        notification.close('open');
        setOpenModal(false);
        console.log('setOpenModal', openModal);
        console.log('open', open);
    }, [open, openModal]);

    return (
        <Modal
            open={open}
            maskClosable={false}
            centered={true}
            onCancel={onClose}
            footer={null}
            closable={false}
            maskStyle={{ backdropFilter: 'blur(6px)' }}
            bodyStyle={{ padding: 0 }}
        />
    );
};
