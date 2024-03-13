import { CloseOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    selectIsDrawerOpen,
    selectSelectedDay,
    selectTrainingToEdit,
} from '@redux/trainings/trainings-slice';
import { Button, Drawer, Typography } from 'antd';
import { FC, ReactNode, useEffect, useState } from 'react';
import { Trainings } from '../calendar-training-item/calendar-training-item';
import './exercise-drawer.less';
import ExerciseItem from './exercise-item/exercise-item';
import dayjs from 'dayjs';

type ExerciseDrawerProps = {
    title: string;
    onClose: () => void;
    closeIcon?: ReactNode;
    selectedTraining: string;
};

const ExerciseDrawer: FC<ExerciseDrawerProps> = ({
    title,
    onClose,
    closeIcon,
    selectedTraining,
}) => {
    const isDrawerOpen = useAppSelector(selectIsDrawerOpen);
    const trainingToEdit = useAppSelector(selectTrainingToEdit);
    const selectedDay = useAppSelector(selectSelectedDay);

    const newTrainingObj = {
        name: selectedTraining,
        date: selectedDay!,
        isImplementation: false,
        parameters: {
            repeat: false,
            period: null,
            jointTraining: false,
            participants: [],
        },
        exercises: [
            {
                name: '',
                replays: 1,
                weight: 0,
                approaches: 3,
                isImplementation: false,
            },
        ],
    };

    const [trainingToUpdate, setTrainingToUpdate] = useState(
        trainingToEdit ? { ...trainingToEdit } : { ...newTrainingObj },
    );

    const trainingKey: Trainings | undefined =
        Trainings[trainingToUpdate.name as keyof typeof Trainings];

    useEffect(() => {
        setTrainingToUpdate(trainingToEdit ? { ...trainingToEdit } : { ...newTrainingObj });
    }, [selectedTraining, trainingToEdit]);

    return (
        <Drawer
            title={title}
            destroyOnClose={true}
            placement='right'
            closable={true}
            closeIcon={closeIcon}
            open={isDrawerOpen}
            className={'exercise-drawer'}
            width={360}
            extra={<Button type='text' size='middle' icon={<CloseOutlined />} onClick={onClose} />}
        >
            <div className='drawer-exercise-header'>
                <li className={`calendar-training-item ${trainingKey}`}>{trainingToUpdate.name}</li>
                <Typography.Text className='drawer-exercise-header-date'>
                    {dayjs(selectedDay, 'DD-MM-YYYY').format('DD.MM.YYYY')}
                </Typography.Text>
            </div>
            {trainingToUpdate.exercises.map((exercise, i) => (
                <ExerciseItem exercise={exercise} key={i} />
            ))}
        </Drawer>
    );
};

export default ExerciseDrawer;
