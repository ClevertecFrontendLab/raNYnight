import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import CreateTrainingModal from '@pages/calendar-page/calendar-modals/create-training-modal/create-training-modal';
import NotificationErrorModal from '@pages/calendar-page/calendar-modals/notification-error-modal/notification-error-modal';
import NotificationWarnModal from '@pages/calendar-page/calendar-modals/notification-warn-modal/notification-warn-modal';
import { SomethingWrongModal } from '@pages/calendar-page/calendar-modals/somthing-wrong-modal/something-wrong-modal';
import TrainingListModal from '@pages/calendar-page/calendar-modals/training-list-modal/training-list-modal';
import { selectActiveModal } from '@redux/modals/modal-manager';

export enum ModalTypes {
    none = 'none',
    calendarTrainingListModal = 'calendarTrainingListModal',
    calendarCreateTrainingModal = 'calendarCreateTrainingModal',
    calendarGetDefaultTrainingsErrorModal = 'calendarGetDefaultTrainingsErrorModal',
    somethingWrongModal = 'somethingWrongModal',
    notificationErrorModal = 'notificationErrorModal',
    notificationWarnModal = 'notificationWarnModal',
}

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

        default:
            return null;
    }
};

export default ModalManager;
