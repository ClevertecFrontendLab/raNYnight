import dayjs from 'dayjs';

import CalendarTrainingItem from '../calendar-training-item/calendar-training-item';
import { ModifiedTraining } from 'src/types/trainings';

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
            {filteredTrainings.map((training: ModifiedTraining) => (
                <CalendarTrainingItem
                    training={training}
                    key={training._id}
                    isEditable={isEditable}
                />
            ))}
        </ul>
    );
};

export default CalendarTrainingList;
