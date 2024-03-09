import dayjs from 'dayjs';
import { NewTrainingResponse } from 'src/types/trainings';
import CalendarTrainingItem from '../calendar-training-item/calendar-training-item';

interface CalendarTrainingListProps {
    trainings: NewTrainingResponse[];
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
            {filteredTrainings.map((training: NewTrainingResponse) => (
                <CalendarTrainingItem
                    training={training}
                    onEdit={() => console.log('open drawer')}
                    key={training._id}
                    isEditable={isEditable}
                />
            ))}
        </ul>
    );
};

export default CalendarTrainingList;
