import { ModalTypes } from '@common-types/modal';
import BigFileErrorModal from '@components/modals/big-file-error-modal/big-file-error';
import CreateTrainingModal from '@components/modals/calendar-modals/create-training-modal/create-training-modal';
import TrainingListModal from '@components/modals/calendar-modals/training-list-modal/training-list-modal';
import NotificationErrorModal from '@components/modals/notification-error-modal/notification-error-modal';
import NotificationWarnModal from '@components/modals/notification-warn-modal/notification-warn-modal';
import { SomethingWrongModal } from '@components/modals/something-wrong-modal/something-wrong-modal';
import TariffNotificationModal from '@components/modals/tariff-notification-modal/tariff-notification-modal';
import WriteFeedbackModal from '@components/modals/write-feedback-modal/write-feedback-modal';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectActiveModal } from '@redux/modals/modal-manager';

const ModalManager = () => {
    const activeModal = useAppSelector(selectActiveModal);
    switch (activeModal) {
        case ModalTypes.somethingWrongModal:
            return <SomethingWrongModal />;

        case ModalTypes.notificationWarnModal:
            return <NotificationWarnModal />;

        case ModalTypes.notificationErrorModal:
            return <NotificationErrorModal />;

        case ModalTypes.calendarTrainingListModal:
            return <TrainingListModal />;

        case ModalTypes.calendarCreateTrainingModal:
            return <CreateTrainingModal />;

        case ModalTypes.tariffNotificationModal:
            return <TariffNotificationModal />;

        case ModalTypes.writeFeedbackModal:
            return <WriteFeedbackModal />;

        case ModalTypes.bigFileErrorModal:
            return <BigFileErrorModal />;

        default:
            return null;
    }
};

export default ModalManager;
