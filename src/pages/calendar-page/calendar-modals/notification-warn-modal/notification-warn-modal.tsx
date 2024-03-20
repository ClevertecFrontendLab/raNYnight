import { FC, useEffect, useState } from 'react';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { ModalTypes } from '@components/modal-manager/modal-manager';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectActiveModal, setActiveModal } from '@redux/modals/modal-manager';
import {
    resetTrainigState,
    setCalendarBlocked,
    setShouldRefetchDefaultTrainings,
} from '@redux/trainings/trainings-slice';
import { Button, Modal, notification, Typography } from 'antd';

import './notification-modal.less';

const NotificationWarnModal: FC = () => {
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState(true);

    const isOpen = useAppSelector(selectActiveModal) === ModalTypes.notificationWarnModal;

    const handleCloseNotificationModal = () => {
        notification.close('open');
        dispatch(setActiveModal(ModalTypes.none));
        dispatch(resetTrainigState());
        dispatch(setCalendarBlocked(true));
    };

    const handleRefreshClick = () => {
        notification.close('open');
        dispatch(setShouldRefetchDefaultTrainings(true));
        dispatch(setActiveModal(ModalTypes.none));
    };

    const openNotification = () => {
        const key = 'open';

        notification.open({
            message: (
                <Typography.Title data-test-id={DATA_TEST_ID.modalErrorUserTrainingTitle} level={5}>
                    При открытии данных произошла ошибка
                </Typography.Title>
            ),
            description: (
                <Typography.Text
                    data-test-id={DATA_TEST_ID.modalErrorUserTrainingSubtitle}
                    type='secondary'
                >
                    Попробуйте ещё раз.
                </Typography.Text>
            ),
            btn: (
                <Button
                    type='primary'
                    size='middle'
                    onClick={handleRefreshClick}
                    data-test-id={DATA_TEST_ID.modalErrorUserTrainingButton}
                >
                    Обновить
                </Button>
            ),
            key,
            icon: <CloseCircleOutlined className='warning-icon' />,
            duration: 0,
            closeIcon: (
                <CloseOutlined data-test-id={DATA_TEST_ID.modalErrorUserTrainingButtonClose} />
            ),
            onClose: handleCloseNotificationModal,
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
    }, [open, openModal]);

    return (
        <Modal
            open={isOpen}
            maskClosable={false}
            centered={true}
            onCancel={handleCloseNotificationModal}
            footer={null}
            closable={false}
            maskStyle={{ backdropFilter: 'blur(6px)' }}
            bodyStyle={{ padding: 0 }}
        />
    );
};

export default NotificationWarnModal;
