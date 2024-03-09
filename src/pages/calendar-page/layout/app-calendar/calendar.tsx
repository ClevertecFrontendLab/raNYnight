import Calendar from '@components/calendar/calendar';
import TrainingListModal from '@pages/calendar-page/calendar-modals/training-list-modal/training-list-modal';
import CalendarTrainingList from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import { useGetTrainingsQuery } from '@redux/trainings/trainings-api';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useState } from 'react';
import './calendar.less';

const AppCalendar = () => {
    const [isTrainingListModalOpen, setIsTrainingListModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [cellPosition, setCellPosition] = useState({
        top: 0,
        left: 0,
    });
    const { data: trainingList } = useGetTrainingsQuery();

    // const handleCellSelect = (date: dayjs.Dayjs) => {
    //     const cellPosition = getSelectedCellPosition(date);
    //     setSelectedDate(date);
    //     setCellPosition(cellPosition);
    //     setIsTrainingListModalOpen(true);
    // };

    const handleCellClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        const cellNode = target.closest('.calendar-date-cell');
        const dateAttribute = cellNode?.getAttribute('data-date');
        const date = dayjs(dateAttribute);
        const cellPosition = getSelectedCellPosition(date);
        setSelectedDate(date);
        setCellPosition(cellPosition);
        setIsTrainingListModalOpen(true);
    };

    const handleCloseTrainingListModal = () => {
        setIsTrainingListModalOpen(false);
    };

    return (
        <main className='calendar-wrapper'>
            <Calendar
                className='app-calendar'
                // onSelect={handleCellSelect}
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
                isModalOpen={isTrainingListModalOpen}
                trainings={trainingList || []}
                onClose={handleCloseTrainingListModal}
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
