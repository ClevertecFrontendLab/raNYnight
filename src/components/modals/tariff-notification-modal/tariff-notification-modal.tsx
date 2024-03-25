import { CloseOutlined } from '@ant-design/icons';
import { ResultImages } from '@constants/results';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectUserInfo, setShouldRefetch } from '@redux/profile/profile-slice';
import { Modal, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';

import './tariff-notification-modal.tsx.less';
import { useWindowSize } from 'usehooks-ts';
import { BREAKPOINT_520 } from '@constants/breakpoints';
import { TARIFF_NOTIFICATION_WIDTH, TARIFF_NOTIFICATION_WIDTH_MOBILE } from '@constants/sizes';
import { selectActiveModal, setActiveModal } from '@redux/modals/modal-manager';
import { ModalTypes } from '@components/modal-manager/modal-manager';
import { useNavigate } from 'react-router-dom';
import { setAuthToken, setRememberMe } from '@redux/auth/auth-slice';
import { Paths } from '@router/paths';
import { DATA_TEST_ID } from '@constants/data-test-id';

const TariffNotificationModal = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { width } = useWindowSize();

    const userInfo = useAppSelector(selectUserInfo);

    const isOpen = useAppSelector(selectActiveModal) === ModalTypes.tariffNotificationModal;

    const handleExit = () => {
        localStorage.getItem('jwtToken') && localStorage.removeItem('jwtToken');
        sessionStorage.getItem('jwtToken') && sessionStorage.removeItem('jwtToken');
        dispatch(setAuthToken(null));
        dispatch(setRememberMe(false));
        dispatch(setShouldRefetch(true));
        navigate(Paths.AUTH);
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
            onCancel={handleCloseModal}
            closeIcon={<CloseOutlined data-test-id={DATA_TEST_ID.tariffModalSuccess} />}
            className='tariff-notification-modal'
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
