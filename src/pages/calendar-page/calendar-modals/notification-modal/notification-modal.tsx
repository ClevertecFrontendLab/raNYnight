import { FC, memo, useEffect, useState } from 'react';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Modal, notification, Typography } from 'antd';

import './notification-modal.less';

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
                <Typography.Title data-test-id='modal-error-user-training-title' level={5}>
                    {title}
                </Typography.Title>
            ),
            description: (
                <Typography.Text data-test-id='modal-error-user-training-subtitle' type='secondary'>
                    {subtitle}
                </Typography.Text>
            ),
            btn: (
                <Button
                    type='primary'
                    size='middle'
                    onClick={onClickButton}
                    data-test-id='modal-error-user-training-button'
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
                <CloseOutlined data-test-id='modal-error-user-training-button-close' />
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
    }, [open, openModal]);

    return (
        <Modal
            open={open}
            maskClosable={true}
            centered={true}
            onCancel={onClose}
            footer={null}
            closable={false}
            maskStyle={{ backdropFilter: 'blur(6px)' }}
            bodyStyle={{ padding: 0 }}
        />
    );
};
