import { ModifiedTraining } from '@common-types/trainings';
import dayjs from 'dayjs';

import CalendarTrainingItem from '../calendar-training-item/calendar-training-item';

interface CalendarTrainingListProps {
    trainings: ModifiedTraining[];
    isEditable: boolean;
    date: dayjs.Dayjs;
}

const CalendarTrainingList = ({ trainings, isEditable, date }: CalendarTrainingListProps) => {
    const filteredTrainings = trainings.filter((training) => {
        const trainingDate = dayjs(training.date).format('YYYY-MM-DD');
        return trainingDate === date.format('YYYY-MM-DD').toString();
    });
    return (
        <ul className='calendar-training-list'>
            {filteredTrainings.map((training: ModifiedTraining, index) => (
                <CalendarTrainingItem
                    training={training}
                    key={training._id}
                    isEditable={isEditable}
                    index={index}
                />
            ))}
        </ul>
    );
};

export default CalendarTrainingList;
