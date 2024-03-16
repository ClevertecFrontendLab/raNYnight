import { trainingButtonTitles } from '@constants/trainings';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import CalendarTrainingList from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import { ModalTypes, selectModalByType, toggleModal } from '@redux/modals/modals-slice';
import { selectDefaultTrainings, setTrainingToEdit } from '@redux/trainings/trainings-slice';
import { Modal } from 'antd';
import dayjs from 'dayjs';
import { ModifiedTraining } from 'src/types/trainings';

import CreateTrainingModal from '../create-training-modal/create-training-modal';

import './training-list-modal.less';

interface TrainingListModalProps {
    date: dayjs.Dayjs;
    trainings: ModifiedTraining[];
    position: {
        top: number;
        left: number;
    };
}

const TrainingListModal = ({ date, trainings, position }: TrainingListModalProps) => {
    const dispatch = useAppDispatch();
    const isTrainingListModalOpen = useAppSelector(
        selectModalByType(ModalTypes.calendarTrainingListModal),
    );
    const isCreateTrainingModalOpen = useAppSelector(
        selectModalByType(ModalTypes.calendarCreateTrainingModal),
    );
    const defaultTrainings = useAppSelector(selectDefaultTrainings);

    const isPastDay = date.isBefore(dayjs(), 'day');
    const isToday = date.isSame(dayjs(), 'day');

    const isOkButtonDisasbled =
        isPastDay || isToday || trainings.length === defaultTrainings.length;

    const handleToggleCreateTrainingModal = () => {
        dispatch(toggleModal(ModalTypes.calendarCreateTrainingModal));
        dispatch(setTrainingToEdit(null));
    };

    const handleTogleTrainingListModal = () => {
        dispatch(toggleModal(ModalTypes.calendarTrainingListModal));
    };

    return (
        <>
            <Modal
                title={`Тренировки на ${date.format('DD.MM.YYYY')}`}
                okText={trainingButtonTitles.addTraining}
                onOk={handleToggleCreateTrainingModal}
                onCancel={handleTogleTrainingListModal}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{
                    style: { width: '100%', margin: 0 },
                    disabled: isOkButtonDisasbled,
                }}
                open={isTrainingListModalOpen && !isCreateTrainingModalOpen}
                className='training-list-modal'
                width={264}
                mask={false}
                style={{ top: position.top, left: position.left }}
            >
                <CalendarTrainingList trainings={trainings} isEditable={true} date={date} />
            </Modal>
            <CreateTrainingModal position={position} />
        </>
    );
};

export default TrainingListModal;
