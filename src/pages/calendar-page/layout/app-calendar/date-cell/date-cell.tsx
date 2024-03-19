import React from 'react';
import CalendarTrainingList from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import dayjs from 'dayjs';
import { ModifiedTraining } from '@common-types/trainings';

interface DateCellProps {
    date: dayjs.Dayjs;
    isFullscreen: boolean;
    trainingList: ModifiedTraining[] | [];
    handleDesktopCellClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    handleMobileCellClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const DateCell: React.FC<DateCellProps> = ({
    date,
    isFullscreen,
    trainingList,
    handleDesktopCellClick,
    handleMobileCellClick,
}) => {
    const formattedDate = date.format('YYYY-MM-DD');

    if (isFullscreen) {
        return (
            <div
                data-date={formattedDate}
                className='calendar-date-cell'
                onClick={handleDesktopCellClick}
            >
                <div className='date-cell-content'>
                    <CalendarTrainingList trainings={trainingList} isEditable={false} date={date} />
                </div>
            </div>
        );
    }

    const hasTrainingsToday = trainingList?.some(
        (training) => dayjs(training.date).format('YYYY-MM-DD') === formattedDate,
    );

    return (
        <div
            data-date={formattedDate}
            className={`calendar-date-cell-mobile ${hasTrainingsToday ? 'has-trainings' : ''}`}
            onClick={handleMobileCellClick}
        />
    );
};

export default DateCell;
