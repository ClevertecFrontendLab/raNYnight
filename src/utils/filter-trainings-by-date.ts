import dayjs from 'dayjs';
import { ModifiedTraining } from 'src/types/trainings';

export const filterTrainingsByDate = (trainings: ModifiedTraining[], selectedDate: dayjs.Dayjs) => {
    const formattedSelectedDate = selectedDate.format('YYYY-MM-DD').toString();
    return trainings.filter((training) => {
        const trainingDate = dayjs(training.date).format('YYYY-MM-DD');
        return trainingDate === formattedSelectedDate;
    });
};
