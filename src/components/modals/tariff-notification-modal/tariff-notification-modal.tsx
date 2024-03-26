import { CloseOutlined } from '@ant-design/icons';
import { ResultImages } from '@constants/results';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectUserInfo, setUserInfo } from '@redux/profile/profile-slice';
import { Modal, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';

import { ModalTypes } from '@components/modal-manager/modal-manager';
import { BREAKPOINT_520 } from '@constants/breakpoints';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { TARIFF_NOTIFICATION_WIDTH, TARIFF_NOTIFICATION_WIDTH_MOBILE } from '@constants/sizes';
import { setAuthToken, setRememberMe } from '@redux/auth/auth-slice';
import { selectActiveModal, setActiveModal } from '@redux/modals/modal-manager';
import { useWindowSize } from 'usehooks-ts';
import './tariff-notification-modal.less';

const TariffNotificationModal = () => {
    const dispatch = useAppDispatch();
    const { width } = useWindowSize();

    const userInfo = useAppSelector(selectUserInfo);

    const isOpen = useAppSelector(selectActiveModal) === ModalTypes.tariffNotificationModal;

    const handleExit = () => {
        localStorage.getItem('jwtToken') && localStorage.removeItem('jwtToken');
        sessionStorage.getItem('jwtToken') && sessionStorage.removeItem('jwtToken');
        dispatch(setAuthToken(null));
        dispatch(setRememberMe(false));
        dispatch(setUserInfo(null));
    };

    const handleCloseModal = () => {
        dispatch(setActiveModal(ModalTypes.none));
        handleExit();
    };
    return (
        <Modal
            open={isOpen}
            footer={null}
            centered
            zIndex={10000}
            onCancel={handleCloseModal}
            closeIcon={<CloseOutlined />}
            className='tariff-notification-modal'
            data-test-id={DATA_TEST_ID.tariffModalSuccess}
            width={
                width > BREAKPOINT_520
                    ? TARIFF_NOTIFICATION_WIDTH
                    : TARIFF_NOTIFICATION_WIDTH_MOBILE
            }
        >
            {ResultImages.SUCCESS_CHECK}
            <Title className='tariff-notification-modal-title' level={4}>
                Чек для оплаты у вас на почте
            </Title>
            <Typography.Text className='tariff-notification-modal-subtitle'>
                Мы отправили инструкцию для оплаты вам на e-mail <b>{userInfo?.email}</b>. После
                подтверждения оплаты войдите в приложение заново.
            </Typography.Text>
            <Typography.Text className='tariff-notification-modal-subtitle'>
                Не пришло письмо? Проверьте папку спам.
            </Typography.Text>
        </Modal>
    );
};

export default TariffNotificationModal;
