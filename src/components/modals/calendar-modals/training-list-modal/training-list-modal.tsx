import { CloseOutlined } from '@ant-design/icons';
import { ModalTypes } from '@common-types/modal';
import { BREAKPOINT_768 } from '@constants/breakpoints';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { DATE_DD_MM_YYYY, DATE_DDMMYYYY } from '@constants/dates';
import {
    CALENDAR_TRAINING_MODAL_WIDTH,
    CALENDAR_TRAINING_MODAL_WIDTH_MOBILE,
} from '@constants/sizes';
import { trainingButtonTitles } from '@constants/trainings';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import CalendarTrainingList from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import { selectActiveModal, setActiveModal } from '@redux/modals/modal-manager';
import {
    selectCellPosition,
    selectDefaultTrainings,
    selectSelectedDay,
    selectTodaysTrainings,
    setTrainingToEdit,
} from '@redux/trainings/trainings-slice';
import { Modal } from 'antd';
import dayjs from 'dayjs';
import { useWindowSize } from 'usehooks-ts';

import './training-list-modal.less';

const TrainingListModal = () => {
    const { width } = useWindowSize();
    const dispatch = useAppDispatch();
    const selectedDate = useAppSelector(selectSelectedDay);
    const cellPosition = useAppSelector(selectCellPosition);
    const defaultTrainings = useAppSelector(selectDefaultTrainings);
    const todayTrainings = useAppSelector(selectTodaysTrainings);

    const isTrainingListModalOpen =
        useAppSelector(selectActiveModal) === ModalTypes.calendarTrainingListModal;

    const isPastDay = dayjs(selectedDate, DATE_DD_MM_YYYY).isBefore(dayjs(), 'day');
    const isToday = dayjs(selectedDate, DATE_DD_MM_YYYY).isSame(dayjs(), 'day');

    const isOkButtonDisasbled =
        isPastDay || isToday || todayTrainings.length === defaultTrainings.length;

    const handleToggleCreateTrainingModal = () => {
        dispatch(setActiveModal(ModalTypes.calendarCreateTrainingModal));
        dispatch(setTrainingToEdit(null));
    };

    const handleTogleTrainingListModal = () => dispatch(setActiveModal(ModalTypes.none));

    return (
        <Modal
                data-test-id={DATA_TEST_ID.modalCreateTraining}
                destroyOnClose={true}
                title={`Тренировки на ${dayjs(selectedDate, DATE_DD_MM_YYYY).format(
                    DATE_DDMMYYYY,
                )}`}
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
                width={
                    width > BREAKPOINT_768
                        ? CALENDAR_TRAINING_MODAL_WIDTH
                        : CALENDAR_TRAINING_MODAL_WIDTH_MOBILE
                }
                mask={false}
                style={{ top: cellPosition.top, left: cellPosition.left }}
                closeIcon={
                    <CloseOutlined data-test-id={DATA_TEST_ID.modalCreateTrainingButtonClose} />
                }
            >
                <CalendarTrainingList
                    isEditable={true}
                    date={dayjs(selectedDate)}
                    shouldFilter={false}
                />
            </Modal>
    );
};

export default TrainingListModal;
