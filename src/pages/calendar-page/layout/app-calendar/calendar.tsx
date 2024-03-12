import Calendar from '@components/calendar/calendar';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import TrainingListModal from '@pages/calendar-page/calendar-modals/training-list-modal/training-list-modal';
import CalendarTrainingList from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import { ModalTypes, setOpenModal } from '@redux/modals/modals-slice';
import { useGetTrainingsQuery } from '@redux/trainings/trainings-api';
import { setTodaysTrainings } from '@redux/trainings/trainings-slice';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useState } from 'react';
import './calendar.less';

const AppCalendar = () => {
    const dispatch = useAppDispatch();
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [cellPosition, setCellPosition] = useState({
        top: 0,
        left: 0,
    });

    const { data: trainingList } = useGetTrainingsQuery();

    const handleCellClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        const cellNode = target.closest('.calendar-date-cell');
        const dateAttribute = cellNode?.getAttribute('data-date');
        const date = dayjs(dateAttribute);
        const filteredTrainings =
            trainingList?.filter((training) => {
                const trainingDate = dayjs(training.date).format('YYYY-MM-DD');
                return trainingDate === date.format('YYYY-MM-DD').toString();
            }) || [];
        const cellPosition = getSelectedCellPosition(date);
        setSelectedDate(date);
        setCellPosition(cellPosition);
        dispatch(setTodaysTrainings(filteredTrainings));
        dispatch(setOpenModal(ModalTypes.calendarTrainingListModal));
    };

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
