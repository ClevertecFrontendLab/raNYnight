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
import {
    useLazyGetTrainingListQuery,
    useLazyGetTrainingsQuery,
} from '@redux/trainings/trainings-api';
import {
    resetTrainigState,
    selectDefaultTrainings,
    selectIsCalendarBlocked,
    setCalendarBlocked,
    setIsDrawerOpen,
    setModifiedTraining,
    setSelectedDay,
    setTodaysTrainings,
} from '@redux/trainings/trainings-slice';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import 'dayjs/locale/ru';

import { NotificationModal } from '@pages/calendar-page/calendar-modals/notification-modal/notification-modal';
import { selectShouldRefetch, setShouldRefetch } from '@redux/auth/auth-slice';
import { Paths } from '@router/paths';
import { filterTrainingsByDate } from '@utils/filter-trainings-by-date';
import { useNavigate } from 'react-router-dom';
import './calendar.less';
import { useWindowSize } from 'usehooks-ts';
import { BREAKPOINT_768 } from '@constants/breakpoints';
import {
    CALENDAR_TRAINING_MODAL_WIDTH,
    CALENDAR_TRAINING_MODAL_WIDTH_MOBILE,
} from '@constants/sizes';
import CreateTrainingModal from '@pages/calendar-page/calendar-modals/create-training-modal/create-training-modal';

const AppCalendar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { width: windowWidth } = useWindowSize();

    const isFullscreen = windowWidth > BREAKPOINT_768;

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

    const isCreaterTrainingModalOpen = useAppSelector(
        selectModalByType(ModalTypes.calendarCreateTrainingModal),
    );

    const [getUserTrainings, { data: trainingList, isError: isTrainingListError }] =
        useLazyGetTrainingsQuery();

    const [getTrainingList, { isError: isRequestError }] = useLazyGetTrainingListQuery();

    const handleCellClick = (date: dayjs.Dayjs) => {
        const filteredTrainings = filterTrainingsByDate(trainingList || [], date);

        setSelectedDate(date);
        dispatch(setSelectedDay(date.format('DD-MM-YYYY').toString()));
        dispatch(setTodaysTrainings(filteredTrainings));
        dispatch(setModifiedTraining(null));
        dispatch(setCloseModal(ModalTypes.calendarCreateTrainingModal));
        dispatch(setOpenModal(ModalTypes.calendarTrainingListModal));
        dispatch(setIsDrawerOpen(false));
    };

    const handleDesktopCellClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (isCalendarBlocked) {
            return;
        }

        event.stopPropagation();

        const target = event.target as HTMLElement;
        const cellNode = target.closest('.calendar-date-cell');
        const dateAttribute = cellNode?.getAttribute('data-date');
        const date = dayjs(dateAttribute);
        const cellPosition = getSelectedCellPosition(date);

        setCellPosition(cellPosition);

        handleCellClick(date);
    };

    const handleMobileCellClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (isCalendarBlocked) {
            return;
        }

        event.stopPropagation();

        const target = event.target as HTMLElement;
        const dateAttribute = target?.getAttribute('data-date');
        const date = dayjs(dateAttribute);
        const cellPosition = getSelectedCellPositionMobile(date);
        setCellPosition(cellPosition);
        handleCellClick(date);
        console.log('e target', target, 'dateAttribute', dateAttribute);
    };

    const handleGetTrainingList = () => {
        getTrainingList()
            .unwrap()
            .catch(() => {
                dispatch(setOpenModal(ModalTypes.calendarGetDefaultTrainingsModal));
            });
        dispatch(setCloseModal(ModalTypes.calendarGetDefaultTrainingsModal));
    };

    const handleCloseNotificationModal = () => {
        dispatch(setCloseModal(ModalTypes.calendarGetDefaultTrainingsModal));
        dispatch(resetTrainigState());
        dispatch(setCalendarBlocked(true));
    };

    useEffect(() => {
        if (shouldRefetch) {
            getUserTrainings()
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
    }, [shouldRefetch, dispatch, trainingList, navigate]);

    useEffect(() => {
        getUserTrainings();
        if (!defaultTrainings?.length) {
            getTrainingList();
        }
    }, []);

    useEffect(() => {
        if (isTrainingListError) {
            navigate(Paths.MAIN);
            dispatch(setOpenModal(ModalTypes.somethingWrongModal));
            return;
        }
        if (isRequestError) {
            dispatch(setOpenModal(ModalTypes.calendarGetDefaultTrainingsModal));
        }
    }, [isTrainingListError, isRequestError, dispatch]);

    return (
        <main className='calendar-wrapper'>
            <Calendar
                fullscreen={isFullscreen}
                className='app-calendar'
                dateCellRender={(date) => {
                    if (isFullscreen) {
                        return (
                            <>
                                <div
                                    data-date={date.format('YYYY-MM-DD')}
                                    className='calendar-date-cell'
                                    onClick={handleDesktopCellClick}
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
                        );
                    }
                    const hasTrainingsToday = trainingList?.some(
                        (training) =>
                            dayjs(training.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD'),
                    );
                    if (!isFullscreen) {
                        return (
                            <div
                                data-date={date.format('YYYY-MM-DD')}
                                className={`calendar-date-cell-mobile ${
                                    hasTrainingsToday ? 'has-trainings' : ''
                                }`}
                                onClick={handleMobileCellClick}
                            />
                        );
                    }
                }}
            />
            <TrainingListModal
                width={
                    isFullscreen
                        ? CALENDAR_TRAINING_MODAL_WIDTH
                        : CALENDAR_TRAINING_MODAL_WIDTH_MOBILE
                }
                date={selectedDate}
                trainings={trainingList || []}
                position={cellPosition}
            />
            {isCreaterTrainingModalOpen && (
                <CreateTrainingModal
                    position={cellPosition}
                    width={
                        isFullscreen
                            ? CALENDAR_TRAINING_MODAL_WIDTH
                            : CALENDAR_TRAINING_MODAL_WIDTH_MOBILE
                    }
                />
            )}

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

        const modalWidth = CALENDAR_TRAINING_MODAL_WIDTH;
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

function getSelectedCellPositionMobile(date: dayjs.Dayjs) {
    const cell = document
        .querySelector(`[data-date="${date.format('YYYY-MM-DD')}"]`)
        ?.closest('.ant-picker-cell');

    if (cell) {
        const { top, height: cellHeight } = cell.getBoundingClientRect();

        const modalWidth = CALENDAR_TRAINING_MODAL_WIDTH_MOBILE;
        const screenWidth = window.innerWidth;

        const adjustedLeft = (screenWidth - modalWidth) / 2;

        return {
            top: top + cellHeight,
            left: adjustedLeft,
        };
    }

    return { top: 0, left: 0 };
}
