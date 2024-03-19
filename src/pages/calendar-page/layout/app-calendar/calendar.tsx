import Calendar from '@components/calendar/calendar';
import { BREAKPOINT_768 } from '@constants/breakpoints';
import {
    CALENDAR_TRAINING_MODAL_WIDTH,
    CALENDAR_TRAINING_MODAL_WIDTH_MOBILE,
} from '@constants/sizes';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import CreateTrainingModal from '@pages/calendar-page/calendar-modals/create-training-modal/create-training-modal';
import { NotificationModal } from '@pages/calendar-page/calendar-modals/notification-modal/notification-modal';
import TrainingListModal from '@pages/calendar-page/calendar-modals/training-list-modal/training-list-modal';
import { selectShouldRefetch, setShouldRefetch } from '@redux/auth/auth-slice';
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
    setModifiedExercises,
    setModifiedTraining,
    setSelectedDay,
    setTodaysTrainings,
} from '@redux/trainings/trainings-slice';
import { Paths } from '@router/paths';
import { filterTrainingsByDate } from '@utils/filter-trainings-by-date';
import { getSelectedCellPosition, getSelectedCellPositionMobile } from '@utils/get-cell-positions';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from 'usehooks-ts';

import 'dayjs/locale/ru';

import './calendar.less';
import DateCell from './date-cell/date-cell';
import { DATE_DD_MM_YYYY } from '@constants/dates';

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

    const [getUserTrainings, { data: trainingList, isError: isTrainingListError }] =
        useLazyGetTrainingsQuery();

    const [getTrainingList, { isError: isRequestError }] = useLazyGetTrainingListQuery();

    const handleCellClick = (date: dayjs.Dayjs) => {
        const filteredTrainings = filterTrainingsByDate(trainingList || [], date);

        setSelectedDate(date);
        dispatch(setSelectedDay(date.format(DATE_DD_MM_YYYY).toString()));
        dispatch(setTodaysTrainings(filteredTrainings));
        dispatch(setModifiedExercises([]));
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
                dateCellRender={(date) => (
                    <DateCell
                        date={date}
                        isFullscreen={isFullscreen}
                        trainingList={trainingList || []}
                        handleDesktopCellClick={handleDesktopCellClick}
                        handleMobileCellClick={handleMobileCellClick}
                    />
                )}
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

            <CreateTrainingModal
                position={cellPosition}
                width={
                    isFullscreen
                        ? CALENDAR_TRAINING_MODAL_WIDTH
                        : CALENDAR_TRAINING_MODAL_WIDTH_MOBILE
                }
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
