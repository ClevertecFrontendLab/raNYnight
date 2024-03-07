import { Layout } from 'antd';
import './calendar-page.less';
import {
    useCreateTrainingMutation,
    useGetTrainingListQuery,
    useGetTrainingsQuery,
} from '@redux/trainings/trainings-api';
import 'dayjs/locale/ru';

import Calendar from '@components/calendar/calendar';

export const CalendarPage: React.FC = () => {
    // const [createTraining, { data: createTrainingData }] = useCreateTrainingMutation();
    const { data } = useGetTrainingListQuery();
    console.log('dasds', data);
    // const testRequest = {
    //     name: 'Кардио',
    //     date: '2024-03-08T09:35:29.638Z',
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

    // const { data } = useGetTrainingsQuery({ trainingName: 'Ноги' });
    // console.log('data from GET', data);
    // console.log('data from POST', createTrainingData);

    return (
        <Layout className='page-layout'>
            {/* <Calendar onSelect={() => createTraining(testRequest)} /> */}
            <Calendar />
        </Layout>
    );
};
