import { FC, useEffect, useState } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { ModalTypes } from '@common-types/modal';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectActiveModal, setActiveModal } from '@redux/modals/modal-manager';
import { Button, Modal, notification, Typography } from 'antd';

const NotificationErrorModal: FC = () => {
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState(true);

    const isOpen = useAppSelector(selectActiveModal) === ModalTypes.notificationErrorModal;

    const handleCloseNotificationErrorModal = () => {
        notification.close('open');
        dispatch(setActiveModal(ModalTypes.none));
    };

    const openNotification = () => {
        const key = 'open';

        notification.open({
            message: (
                <Typography.Title data-test-id={DATA_TEST_ID.modalErrorUserTrainingTitle} level={5}>
                    При сохранении данных произошла ошибка
                </Typography.Title>
            ),
            description: (
                <Typography.Text
                    data-test-id={DATA_TEST_ID.modalErrorUserTrainingSubtitle}
                    type='secondary'
                >
                    Придётся попробовать ещё раз
                </Typography.Text>
            ),
            btn: (
                <Button
                    type='primary'
                    size='middle'
                    onClick={handleCloseNotificationErrorModal}
                    data-test-id={DATA_TEST_ID.modalErrorUserTrainingButton}
                >
                    Закрыть
                </Button>
            ),
            onClose: handleCloseNotificationErrorModal,
            key,
            icon: <CloseCircleOutlined className='error-icon' />,
            duration: 0,
            closeIcon: null,
            className: 'notification-wrapper',
            placement: 'topRight',
        });
    };

    useEffect(() => {
        if (isOpen && !openModal) {
            openNotification();

            return;
        }
        notification.close('open');
        setOpenModal(false);
    }, [openModal]);

    return (
        <Modal
            open={isOpen}
            maskClosable={false}
            centered={true}
            onCancel={handleCloseNotificationErrorModal}
            footer={null}
            closable={false}
            maskStyle={{ backdropFilter: 'blur(6px)' }}
            bodyStyle={{ padding: 0 }}
        />
    );
};

export default NotificationErrorModal;
