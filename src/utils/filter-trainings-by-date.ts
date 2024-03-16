import { ModifiedTraining } from 'src/types/trainings';
import dayjs from 'dayjs';

export const filterTrainingsByDate = (trainings: ModifiedTraining[], selectedDate: dayjs.Dayjs) => {
    const formattedSelectedDate = selectedDate.format('YYYY-MM-DD').toString();
    console.log('handleCellClick formattedSelectedDate', formattedSelectedDate);
    const res = trainings.filter((training) => {
        const trainingDate = dayjs(training.date).format('YYYY-MM-DD');
        return trainingDate === formattedSelectedDate;
    });
    console.log('res', res);
    return res;
};
