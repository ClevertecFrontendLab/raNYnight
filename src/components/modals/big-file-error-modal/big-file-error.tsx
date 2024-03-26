import { FC, useEffect, useState } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { ModalTypes } from '@components/modal-manager/modal-manager';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectActiveModal, setActiveModal } from '@redux/modals/modal-manager';
import { Button, Modal, notification, Typography } from 'antd';

const BigFileErrorModal: FC = () => {
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState(true);

    const isOpen = useAppSelector(selectActiveModal) === ModalTypes.bigFileErrorModal;

    const handleCloseModal = () => {
        notification.close('open');
        dispatch(setActiveModal(ModalTypes.none));
    };

    const openNotification = () => {
        const key = 'open';

        notification.open({
            message: <Typography.Title level={5}>Файл слишко большой</Typography.Title>,
            description: (
                <Typography.Text type='secondary'>Выберите файл размером до 5 МБ.</Typography.Text>
            ),
            btn: (
                <Button
                    type='primary'
                    size='middle'
                    onClick={handleCloseModal}
                    data-test-id={DATA_TEST_ID.bigFileErrorClose}
                >
                    Закрыть
                </Button>
            ),
            onClose: handleCloseModal,
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
    }, [open, openModal]);

    return (
        <Modal
            open={isOpen}
            maskClosable={false}
            centered={true}
            onCancel={handleCloseModal}
            footer={null}
            closable={false}
            maskStyle={{ backdropFilter: 'blur(6px)' }}
            bodyStyle={{ padding: 0 }}
        />
    );
};

export default BigFileErrorModal;
