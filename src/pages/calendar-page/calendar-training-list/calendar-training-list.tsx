import { ModifiedTraining } from '@common-types/trainings';
import { DATE_YYYY_MM_DD } from '@constants/dates';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectAllUserTrainings, selectTodaysTrainings } from '@redux/trainings/trainings-slice';
import dayjs from 'dayjs';

import CalendarTrainingItem from '../calendar-training-item/calendar-training-item';

interface CalendarTrainingListProps {
    isEditable: boolean;
    date: dayjs.Dayjs;
    shouldFilter: boolean;
}

const CalendarTrainingList = ({ isEditable, date, shouldFilter }: CalendarTrainingListProps) => {
    const allUserTrainings = useAppSelector(selectAllUserTrainings);
    const todaysTrainings = useAppSelector(selectTodaysTrainings);

    const filteredTrainings = allUserTrainings.filter((training) => {
        const trainingDate = dayjs(training.date).format(DATE_YYYY_MM_DD);

        return trainingDate === date.format(DATE_YYYY_MM_DD).toString();
    });

    const trainingsToRender = shouldFilter ? filteredTrainings : todaysTrainings;

    return (
        <ul className='calendar-training-list'>
            {trainingsToRender.map((training: ModifiedTraining, index) => (
                <CalendarTrainingItem
                    training={training}
                    // eslint-disable-next-line no-underscore-dangle
                    key={training._id}
                    isEditable={isEditable}
                    index={index}
                />
            ))}
        </ul>
    );
};

export default CalendarTrainingList;
