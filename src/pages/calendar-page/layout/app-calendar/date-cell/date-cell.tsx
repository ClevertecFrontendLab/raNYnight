/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { ModifiedTraining } from '@common-types/trainings';
import { DATE_YYYY_MM_DD } from '@constants/dates';
import CalendarTrainingList from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import dayjs from 'dayjs';

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
    const formattedDate = date.format(DATE_YYYY_MM_DD);

    if (isFullscreen) {
        return (
            <div
                data-date={formattedDate}
                className='calendar-date-cell'
                onClick={handleDesktopCellClick}
            >
                <div className='date-cell-content'>
                    <CalendarTrainingList isEditable={false} date={date} shouldFilter={true} />
                </div>
            </div>
        );
    }

    const hasTrainingsToday = trainingList?.some(
        (training) => dayjs(training.date).format(DATE_YYYY_MM_DD) === formattedDate,
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
