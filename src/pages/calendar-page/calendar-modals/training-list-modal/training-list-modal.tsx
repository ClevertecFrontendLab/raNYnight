import { trainingButtonTitles } from '@constants/trainings';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import CalendarTrainingList from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import {
    ModalTypes,
    selectModalByType,
    setCloseModal,
    setOpenModal,
} from '@redux/modals/modals-slice';
import {
    selectDefaultTrainings,
    selectTodaysTrainings,
    setTrainingToEdit,
} from '@redux/trainings/trainings-slice';
import { Modal } from 'antd';
import dayjs from 'dayjs';
import { ModifiedTraining } from 'src/types/trainings';

import { CloseOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/data-test-id';
import './training-list-modal.less';

interface TrainingListModalProps {
    date: dayjs.Dayjs;
    trainings: ModifiedTraining[];
    position: {
        top: number;
        left: number;
    };
    width: number;
}

const TrainingListModal = ({ date, trainings, position, width }: TrainingListModalProps) => {
    const dispatch = useAppDispatch();

    const isTrainingListModalOpen = useAppSelector(
        selectModalByType(ModalTypes.calendarTrainingListModal),
    );
    // const isCreateTrainingModalOpen = useAppSelector(
    //     selectModalByType(ModalTypes.calendarCreateTrainingModal),
    // );
    const defaultTrainings = useAppSelector(selectDefaultTrainings);
    const todayTrainings = useAppSelector(selectTodaysTrainings);

    const isPastDay = date.isBefore(dayjs(), 'day');
    const isToday = date.isSame(dayjs(), 'day');

    const isOkButtonDisasbled =
        isPastDay || isToday || todayTrainings.length === defaultTrainings.length;

    const handleToggleCreateTrainingModal = () => {
        dispatch(setOpenModal(ModalTypes.calendarCreateTrainingModal));
        dispatch(setCloseModal(ModalTypes.calendarTrainingListModal));
        dispatch(setTrainingToEdit(null));
    };

    const handleTogleTrainingListModal = () => {
        dispatch(setCloseModal(ModalTypes.calendarTrainingListModal));
    };

    return (
        <>
            <Modal
                data-test-id={DATA_TEST_ID.modalCreateTraining}
                destroyOnClose
                title={`Тренировки на ${date.format('DD.MM.YYYY')}`}
                okText={trainingButtonTitles.addTraining}
                onOk={handleToggleCreateTrainingModal}
                onCancel={handleTogleTrainingListModal}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{
                    style: { width: '100%', margin: 0 },
                    disabled: isOkButtonDisasbled,
                }}
                open={isTrainingListModalOpen}
                bodyStyle={{ padding: '5px 25px' }}
                className='training-list-modal'
                width={width}
                mask={false}
                style={{ top: position.top, left: position.left }}
                closeIcon={
                    <CloseOutlined data-test-id={DATA_TEST_ID.modalCreateTrainingButtonClose} />
                }
            >
                <CalendarTrainingList trainings={trainings} isEditable={true} date={date} />
            </Modal>
        </>
    );
};

export default TrainingListModal;
