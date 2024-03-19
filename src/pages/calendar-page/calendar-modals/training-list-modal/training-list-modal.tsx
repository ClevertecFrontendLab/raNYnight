import { CloseOutlined } from '@ant-design/icons';
import { ModifiedTraining } from '@common-types/trainings';
import { DATA_TEST_ID } from '@constants/data-test-id';
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

import './training-list-modal.less';
import { DATE_DDMMYYYY } from '@constants/dates';

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
                destroyOnClose={true}
                title={`Тренировки на ${date.format(DATE_DDMMYYYY)}`}
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
