import { Modal } from 'antd';
import dayjs from 'dayjs';

import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import CalendarTrainingList from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import { ModalTypes, selectModalByType, toggleModal } from '@redux/modals/modals-slice';
import { selectTodaysTrainings } from '@redux/trainings/trainings-slice';
import { NewTrainingResponse } from 'src/types/trainings';
import CreateTrainingModal from '../create-training-modal/create-training-modal';
import './training-list-modal.less';

interface TrainingListModalProps {
    date: dayjs.Dayjs;
    trainings: NewTrainingResponse[];
    position: {
        top: number;
        left: number;
    };
}

const TrainingListModal = ({ date, trainings, position }: TrainingListModalProps) => {
    const dispatch = useAppDispatch();
    const todaysTrainings = useAppSelector(selectTodaysTrainings);
    const isTrainingListModalOpen = useAppSelector(
        selectModalByType(ModalTypes.calendarTrainingListModal),
    );
    const isCreateTrainingModalOpen = useAppSelector(
        selectModalByType(ModalTypes.calendarCreateTrainingModal),
    );

    const handleToggleCreateTrainingModal = () => {
        dispatch(toggleModal(ModalTypes.calendarCreateTrainingModal));
    };

    const handleTogleModal = () => {
        dispatch(toggleModal(ModalTypes.calendarTrainingListModal));
    };

    return (
        <>
            <Modal
                title={`Тренировки на ${date.format('DD.MM.YYYY')}`}
                okText='Добавить тренировку'
                onOk={handleToggleCreateTrainingModal}
                onCancel={handleTogleModal}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{
                    style: { width: '100%', margin: 0 },
                    disabled: todaysTrainings.length === 5,
                }}
                open={isTrainingListModalOpen && !isCreateTrainingModalOpen}
                className='training-list-modal'
                width={264}
                mask={false}
                style={{ top: position.top, left: position.left }}
            >
                <CalendarTrainingList trainings={trainings} isEditable={true} date={date} />
            </Modal>
            <CreateTrainingModal date={date} trainings={trainings} position={position} />
        </>
    );
};

export default TrainingListModal;
