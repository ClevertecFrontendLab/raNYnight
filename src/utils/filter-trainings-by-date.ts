import { ModifiedTraining } from '@common-types/trainings';
import dayjs from 'dayjs';

export const filterTrainingsByDate = (trainings: ModifiedTraining[], selectedDate: dayjs.Dayjs) => {
    const formattedSelectedDate = selectedDate.format('YYYY-MM-DD').toString();
    return trainings.filter((training) => {
        const trainingDate = dayjs(training.date).format('YYYY-MM-DD');
        return trainingDate === formattedSelectedDate;
    });
};
