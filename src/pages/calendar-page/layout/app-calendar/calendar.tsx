import Calendar from '@components/calendar/calendar';
import TrainingListModal from '@pages/calendar-page/calendar-modals/training-list-modal/training-list-modal';
import CalendarTrainingList from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import { useGetTrainingsQuery } from '@redux/trainings/trainings-api';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useState } from 'react';
import './calendar.less';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setTodaysTrainings } from '@redux/trainings/trainings-slice';
import { ModalTypes, toggleModal } from '@redux/modals/modals-slice';

const AppCalendar = () => {
    const dispatch = useAppDispatch();
    const [isTrainingListModalOpen, setIsTrainingListModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [cellPosition, setCellPosition] = useState({
        top: 0,
        left: 0,
    });

    const { data: trainingList } = useGetTrainingsQuery();

    const handleCellClick = (event: React.MouseEvent<HTMLDivElement>) => {
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
        setIsTrainingListModalOpen(true);
        dispatch(setTodaysTrainings(filteredTrainings));
        dispatch(toggleModal(ModalTypes.calendarTrainingListModal));
    };

    return (
        <main className='calendar-wrapper'>
            <Calendar
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
        const { top, left, width: cellWidth } = cell.getBoundingClientRect();
        const modalWidth = 264;
        const windowWidth = window.innerWidth;
        let adjustedLeft = left + window.scrollX;
        const toMove = modalWidth - cellWidth;

        if (adjustedLeft + modalWidth > windowWidth) {
            adjustedLeft = left + window.scrollX - toMove;
        }

        const result = {
            top: top + window.scrollY,
            left: adjustedLeft,
        };

        return result;
    }

    return { top: 0, left: 0 };
}

// const testRequest = {
//     name: 'Спина',
//     date,
//     isImplementation: false,
//     parameters: {
//         repeat: false,
//         period: 7,
//         jointTraining: false,
//         participants: [],
//     },
//     exercises: [
//         {
//             name: 'Сгибание ног',
//             replays: 4,
//             weight: 25,
//             approaches: 10,
//             isImplementation: false,
//         },
//         {
//             name: 'Разгибание ног',
//             replays: 4,
//             weight: 25,
//             approaches: 10,
//             isImplementation: false,
//         },
//         {
//             name: 'Приседания',
//             replays: 4,
//             weight: 25,
//             approaches: 10,
//             isImplementation: false,
//         },
//     ],
// };
