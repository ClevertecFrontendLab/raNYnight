import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '@components/calendar/calendar';
import Loader from '@components/loader/loader';
import { ModalTypes } from '@components/modal-manager/modal-manager';
import { BREAKPOINT_768 } from '@constants/breakpoints';
import { DATE_DD_MM_YYYY } from '@constants/dates';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setActiveModal } from '@redux/modals/modal-manager';
import {
    useLazyGetTrainingListQuery,
    useLazyGetTrainingsQuery,
} from '@redux/trainings/trainings-api';
import {
    selectDefaultTrainings,
    selectIsCalendarBlocked,
    selectShouldRefetchDefaultTrainings,
    selectShouldRefetchUserTrainings,
    setCellPosition,
    setIsDrawerOpen,
    setModifiedExercises,
    setModifiedTraining,
    setSelectedDay,
    setShouldRefetchDefaultTrainings,
    setShouldRefetchUserTrainings,
    setTodaysTrainings,
} from '@redux/trainings/trainings-slice';
import { Paths } from '@router/paths';
import { filterTrainingsByDate } from '@utils/filter-trainings-by-date';
import { getSelectedCellPosition, getSelectedCellPositionMobile } from '@utils/get-cell-positions';
import dayjs from 'dayjs';
import { useWindowSize } from 'usehooks-ts';

import 'dayjs/locale/ru';

import DateCell from './date-cell/date-cell';

import './calendar.less';

const AppCalendar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { width: windowWidth } = useWindowSize();

    const isFullscreen = windowWidth > BREAKPOINT_768;

    const [selectedDate, setSelectedDate] = useState(dayjs());

    const defaultTrainings = useAppSelector(selectDefaultTrainings);
    const isCalendarBlocked = useAppSelector(selectIsCalendarBlocked);
    const shouldRefetchUserTrainings = useAppSelector(selectShouldRefetchUserTrainings);
    const shouldRefetchDefaultTrainings = useAppSelector(selectShouldRefetchDefaultTrainings);

    const [
        getUserTrainings,
        { data: trainingList, isError: isTrainingListError, isLoading: isGetTrainingsLoading },
    ] = useLazyGetTrainingsQuery();

    const [getTrainingList, { isError: isRequestError, isLoading: isGetTrainingListLoading }] =
        useLazyGetTrainingListQuery();

    const handleCellClick = (date: dayjs.Dayjs) => {
        const filteredTrainings = filterTrainingsByDate(trainingList || [], date);

        setSelectedDate(date);
        dispatch(setSelectedDay(date.format(DATE_DD_MM_YYYY).toString()));
        dispatch(setTodaysTrainings(filteredTrainings));
        dispatch(setModifiedExercises([]));
        dispatch(setModifiedTraining(null));
        dispatch(setActiveModal(ModalTypes.calendarTrainingListModal));
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

        dispatch(setCellPosition(cellPosition));

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
        dispatch(setCellPosition(cellPosition));
        handleCellClick(date);
    };

    useEffect(() => {
        if (shouldRefetchUserTrainings) {
            getUserTrainings()
                .unwrap()
                .then(() => {
                    const filteredTrainings = filterTrainingsByDate(
                        trainingList || [],
                        selectedDate,
                    );
                    dispatch(setTodaysTrainings(filteredTrainings));
                    dispatch(setShouldRefetchUserTrainings(false));
                });
        }
    }, [shouldRefetchUserTrainings, dispatch, trainingList, navigate]);

    useEffect(() => {
        getUserTrainings();
        if (!defaultTrainings?.length) {
            getTrainingList();
        }
    }, []);

    useEffect(() => {
        if (shouldRefetchDefaultTrainings) {
            dispatch(setShouldRefetchDefaultTrainings(false));
            getTrainingList()
                .unwrap()
                .catch(() => dispatch(setActiveModal(ModalTypes.notificationWarnModal)));
        }
    }, [shouldRefetchDefaultTrainings, dispatch]);

    useEffect(() => {
        if (isTrainingListError) {
            navigate(Paths.MAIN);
            dispatch(setActiveModal(ModalTypes.somethingWrongModal));
            return;
        }
        if (isRequestError) {
            dispatch(setActiveModal(ModalTypes.notificationWarnModal));
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
            {(isGetTrainingListLoading || isGetTrainingsLoading) && <Loader />}
        </main>
    );
};

export default AppCalendar;
