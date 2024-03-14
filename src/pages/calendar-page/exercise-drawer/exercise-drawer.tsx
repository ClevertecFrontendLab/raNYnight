import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    selectIsDrawerOpen,
    selectSelectedDay,
    selectTrainingToEdit,
    setIsDrawerOpen,
    setModifiedTraining,
} from '@redux/trainings/trainings-slice';
import { Button, Drawer, Typography } from 'antd';
import { FC, ReactNode, useEffect, useState } from 'react';
import { Trainings } from '../calendar-training-item/calendar-training-item';
import './exercise-drawer.less';
import ExerciseItem from './exercise-item/exercise-item';
import dayjs from 'dayjs';
import { Exercise, NewTrainingRequest } from 'src/types/trainings';
import { exercisesTitles, trainingButtonTitles, trainingDrawerTitles } from '@constants/trainings';

type ExerciseDrawerProps = {
    title: string;
    closeIcon?: ReactNode;
    selectedTraining: string;
};

const ExerciseDrawer: FC<ExerciseDrawerProps> = ({ title, closeIcon, selectedTraining }) => {
    const dispatch = useAppDispatch();
    const isDrawerOpen = useAppSelector(selectIsDrawerOpen);
    const trainingToEdit = useAppSelector(selectTrainingToEdit);
    const selectedDay = useAppSelector(selectSelectedDay);

    const newExerciseObj: Exercise = {
        name: '',
        replays: 1,
        weight: 0,
        approaches: 3,
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
        const updatedExercises = trainingToUpdate.exercises.filter(
            (exercise) => !exercise.selected,
        );
        setTrainingToUpdate((prevState) => ({ ...prevState, exercises: updatedExercises }));
    };

    const handleCloseDrawer = () => {
        const modifiedTraining = {
            ...trainingToUpdate,
            exercises: trainingToUpdate.exercises
                .map(({ index, selected, ...rest }) => rest)
                .filter((exercise) => exercise.name !== ''),
        };
        setTrainingToUpdate(modifiedTraining);
        dispatch(setModifiedTraining(modifiedTraining));
        dispatch(setIsDrawerOpen(false));
    };

    useEffect(() => {
        setTrainingToUpdate(trainingToEdit ? { ...trainingToEdit } : { ...newTrainingObj });
    }, [selectedTraining, trainingToEdit]);

    return (
        <Drawer
            title={title}
            destroyOnClose
            placement='right'
            closable={true}
            closeIcon={closeIcon}
            open={isDrawerOpen}
            className={'exercise-drawer'}
            width={360}
            extra={
                <Button
                    type='text'
                    size='middle'
                    icon={<CloseOutlined />}
                    onClick={handleCloseDrawer}
                />
            }
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
                    key={exercise.name + i}
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
                    {trainingButtonTitles.addMoreExercises}
                </Button>
                <Button
                    icon={<MinusOutlined />}
                    onClick={handleRemoveExercises}
                    disabled={trainingToUpdate.exercises.length === 0}
                >
                    {trainingButtonTitles.deleteExercises}
                </Button>
            </div>
        </Drawer>
    );
};

export default ExerciseDrawer;
