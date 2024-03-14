import { useEffect, useState } from 'react';
import Calendar from '@components/calendar/calendar';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import TrainingListModal from '@pages/calendar-page/calendar-modals/training-list-modal/training-list-modal';
import CalendarTrainingList from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import { ModalTypes, setCloseModal, setOpenModal } from '@redux/modals/modals-slice';
import { useGetTrainingsQuery } from '@redux/trainings/trainings-api';
import {
    setModifiedTraining,
    setSelectedDay,
    setTodaysTrainings,
} from '@redux/trainings/trainings-slice';
import dayjs from 'dayjs';

import 'dayjs/locale/ru';

import './calendar.less';
import { selectShouldRefetch } from '@redux/auth/auth-slice';
import { filterTrainingsByDate } from '@utils/filter-trainings-by-date';

const AppCalendar = () => {
    const dispatch = useAppDispatch();
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [cellPosition, setCellPosition] = useState({
        top: 0,
        left: 0,
    });
    const shouldRefetch = useAppSelector(selectShouldRefetch);

    const { data: trainingList, refetch } = useGetTrainingsQuery();

    const handleCellClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        const cellNode = target.closest('.calendar-date-cell');
        const dateAttribute = cellNode?.getAttribute('data-date');
        const date = dayjs(dateAttribute);
        const filteredTrainings = filterTrainingsByDate(trainingList || [], selectedDate);
        const cellPosition = getSelectedCellPosition(date);
        setSelectedDate(date);
        setCellPosition(cellPosition);
        dispatch(setSelectedDay(date.format('DD-MM-YYYY').toString()));
        dispatch(setTodaysTrainings(filteredTrainings));
        dispatch(setModifiedTraining(null));
        dispatch(setCloseModal(ModalTypes.calendarCreateTrainingModal));
        dispatch(setOpenModal(ModalTypes.calendarTrainingListModal));
    };

    useEffect(() => {
        if (shouldRefetch) {
            refetch()
                .unwrap()
                .then(() => {
                    const filteredTrainings = filterTrainingsByDate(
                        trainingList || [],
                        selectedDate,
                    );
                    dispatch(setTodaysTrainings(filteredTrainings));
                });
        }
    }, [shouldRefetch, dispatch, trainingList]);

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
