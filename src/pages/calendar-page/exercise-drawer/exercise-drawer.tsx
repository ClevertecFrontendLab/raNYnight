import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
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
import { Exercise, NewTrainingRequest } from 'src/types/trainings';

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

    const newExerciseObj: Exercise = {
        name: '',
        replays: '1',
        weight: '0',
        approaches: '3',
        isImplementation: false,
    };

    const newTrainingObj: NewTrainingRequest = {
        name: selectedTraining,
        date: selectedDay!,
        isImplementation: false,
        parameters: {
            repeat: false,
            period: null,
            jointTraining: false,
            participants: [],
        },
        exercises: [newExerciseObj],
    };

    const [trainingToUpdate, setTrainingToUpdate] = useState(
        trainingToEdit ? { ...trainingToEdit } : { ...newTrainingObj },
    );

    const trainingKey: Trainings | undefined =
        Trainings[trainingToUpdate.name as keyof typeof Trainings];

    const handleExerciseChange = (updatedExercise: Exercise) => {
        console.log('handleExerciseChange', updatedExercise);
        const updatedExercises = trainingToUpdate.exercises.map((exercise, i) => {
            if (i === updatedExercise.index) {
                return updatedExercise;
            }
            return exercise;
        });
        setTrainingToUpdate((prevTraining) => ({ ...prevTraining, exercises: updatedExercises }));
    };

    const handleAddExercise = () => {
        setTrainingToUpdate((prevTraining) => {
            const updatedExercises = [...prevTraining.exercises, newExerciseObj];
            return { ...prevTraining, exercises: updatedExercises };
        });
    };

    const handleRemoveExercises = () => {
        console.log('before filter', trainingToUpdate.exercises);
        const updatedExercises = trainingToUpdate.exercises.filter(
            (exercise) => !exercise.selected,
        );
        console.log('after filter', updatedExercises);
        setTrainingToUpdate((prevState) => ({ ...prevState, exercises: updatedExercises }));
    };

    useEffect(() => {
        setTrainingToUpdate(trainingToEdit ? { ...trainingToEdit } : { ...newTrainingObj });
    }, [selectedTraining, trainingToEdit]);

    useEffect(() => {
        console.log('Updated training:', trainingToUpdate.exercises);
    }, [trainingToUpdate, handleRemoveExercises]);

    console.log('trainingToUpdate', trainingToUpdate.exercises);
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
                <ExerciseItem
                    exercise={exercise}
                    key={i}
                    onExerciseChange={handleExerciseChange}
                    index={i}
                />
            ))}
            <div className='drawer-exercise-buttons'>
                <Button
                    icon={<PlusOutlined />}
                    className='drawer-exercise-button-add'
                    onClick={handleAddExercise}
                >
                    Добавить ещё
                </Button>
                <Button icon={<MinusOutlined />} onClick={handleRemoveExercises}>
                    Удалить
                </Button>
            </div>
        </Drawer>
    );
};

export default ExerciseDrawer;
