import { useEffect, useState } from 'react';
import Calendar from '@components/calendar/calendar';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import TrainingListModal from '@pages/calendar-page/calendar-modals/training-list-modal/training-list-modal';
import CalendarTrainingList from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import {
    ModalTypes,
    selectModalByType,
    setCloseModal,
    setOpenModal,
} from '@redux/modals/modals-slice';
import { useGetTrainingsQuery, useLazyGetTrainingListQuery } from '@redux/trainings/trainings-api';
import {
    resetTrainigState,
    selectDefaultTrainings,
    selectIsCalendarBlocked,
    setCalendarBlocked,
    setModifiedTraining,
    setSelectedDay,
    setTodaysTrainings,
} from '@redux/trainings/trainings-slice';
import dayjs from 'dayjs';

import 'dayjs/locale/ru';

import './calendar.less';
import { selectShouldRefetch, setShouldRefetch } from '@redux/auth/auth-slice';
import { filterTrainingsByDate } from '@utils/filter-trainings-by-date';
import FeedbackModalResult from '@pages/feedbacks-page/feedback-modal-results/feedback-modal-results';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@router/paths';
import { NotificationModal } from '@pages/calendar-page/calendar-modals/notification-modal/notification-modal';

const AppCalendar = () => {
    console.log('AppCalendar');

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [cellPosition, setCellPosition] = useState({
        top: 0,
        left: 0,
    });
    const shouldRefetch = useAppSelector(selectShouldRefetch);
    const defaultTrainings = useAppSelector(selectDefaultTrainings);
    const isCalendarBlocked = useAppSelector(selectIsCalendarBlocked);
    const isGetDefaultTrainingsModalOpen = useAppSelector(
        selectModalByType(ModalTypes.calendarGetDefaultTrainingsModal),
    );

    const { data: trainingList, refetch, error } = useGetTrainingsQuery();
    const [getTrainingList, { isError: isRequestError }] = useLazyGetTrainingListQuery();

    const handleCellClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (isCalendarBlocked) {
            return;
        }
        event.stopPropagation();
        const target = event.target as HTMLElement;
        const cellNode = target.closest('.calendar-date-cell');
        const dateAttribute = cellNode?.getAttribute('data-date');
        const date = dayjs(dateAttribute);

        const filteredTrainings = filterTrainingsByDate(trainingList || [], date);
        const cellPosition = getSelectedCellPosition(date);
        setSelectedDate(date);
        setCellPosition(cellPosition);
        dispatch(setSelectedDay(date.format('DD-MM-YYYY').toString()));
        dispatch(setTodaysTrainings(filteredTrainings));
        dispatch(setModifiedTraining(null));
        dispatch(setCloseModal(ModalTypes.calendarCreateTrainingModal));
        dispatch(setOpenModal(ModalTypes.calendarTrainingListModal));
    };

    const handleGetTrainingList = () => {
        getTrainingList();
        dispatch(setCloseModal(ModalTypes.calendarGetDefaultTrainingsModal));
    };

    const handleCloseNotificationModal = () => {
        dispatch(setCloseModal(ModalTypes.calendarGetDefaultTrainingsModal));
        dispatch(resetTrainigState());
        dispatch(setCalendarBlocked(true));
    };

    useEffect(() => {
        if (shouldRefetch) {
            console.log('refetch');
            refetch()
                .unwrap()
                .then(() => {
                    const filteredTrainings = filterTrainingsByDate(
                        trainingList || [],
                        selectedDate,
                    );
                    dispatch(setTodaysTrainings(filteredTrainings));
                    dispatch(setShouldRefetch(false));
                });
        }

        if (error) {
            const handleCancel = () => {
                navigate(Paths.MAIN);
            };
            FeedbackModalResult.getError(handleCancel);
        }
    }, [shouldRefetch, dispatch, trainingList, FeedbackModalResult, navigate]);

    useEffect(() => {
        if (!defaultTrainings?.length) {
            getTrainingList();
        }
    }, []);

    useEffect(() => {
        if (isRequestError) {
            dispatch(setOpenModal(ModalTypes.calendarGetDefaultTrainingsModal));
        }
    }, [isRequestError]);

    return (
        <main className='calendar-wrapper'>
            <Calendar
                fullscreen={true}
                className='app-calendar'
                dateCellRender={(date) => (
                    <>
                        <div
                            data-date={date.format('YYYY-MM-DD')}
                            className='calendar-date-cell'
                            onClick={handleCellClick}
                        >
                            <div className='date-cell-content'>
                                <CalendarTrainingList
                                    trainings={trainingList || []}
                                    isEditable={false}
                                    date={date}
                                />
                            </div>
                        </div>
                    </>
                )}
            />
            <TrainingListModal
                date={selectedDate}
                trainings={trainingList || []}
                position={cellPosition}
            />
            <NotificationModal
                textButton='Обновить'
                onClickButton={handleGetTrainingList}
                type='warning'
                isCloseIcon={true}
                title='При открытии данных произошла ошибка'
                subtitle='Попробуйте ещё раз.'
                open={isGetDefaultTrainingsModalOpen}
                onClose={handleCloseNotificationModal}
            />
        </main>
    );
};

export default AppCalendar;

function getSelectedCellPosition(date: dayjs.Dayjs) {
    const cell = document
        .querySelector(`[data-date="${date.format('YYYY-MM-DD')}"]`)
        ?.closest('.ant-picker-cell');

    if (cell) {
        const { top, left: cellLeft, width: cellWidth } = cell.getBoundingClientRect();
        const { left: bodyLeft } = document.body.getBoundingClientRect();

        const modalWidth = 264;
        const bodyWidth = document.body.offsetWidth;
        const leftRelativeToBody = cellLeft - bodyLeft;

        let adjustedLeft = cellLeft + window.scrollX;
        const toMove = modalWidth - cellWidth;

        if (leftRelativeToBody + modalWidth > bodyWidth) {
            adjustedLeft -= toMove;
        }

        return {
            top: top + window.scrollY,
            left: adjustedLeft,
        };
    }

    return { top: 0, left: 0 };
}
