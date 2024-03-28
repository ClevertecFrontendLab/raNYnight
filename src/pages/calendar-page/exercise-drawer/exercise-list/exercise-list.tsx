import React, { useEffect, useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Exercise } from '@common-types/trainings';
import { trainingButtonTitles } from '@constants/trainings';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    selectIsDrawerOpen,
    selectModifiedTraining,
    selectTrainingToEdit,
    setModifiedExercises,
} from '@redux/trainings/trainings-slice';
import { Button } from 'antd';

import ExerciseItem from '../exercise-item/exercise-item';

interface ExerciseListProps {
    exercises: Exercise[];
}

const newExerciseObj: Exercise = {
    name: '',
    replays: 1,
    weight: 0,
    approaches: 3,
    isImplementation: false,
    index: 0,
};

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises }) => {
    const dispatch = useAppDispatch();
    const trainingToEdit = useAppSelector(selectTrainingToEdit);
    const modifiedTraining = useAppSelector(selectModifiedTraining);
    const isDrawerOpen = useAppSelector(selectIsDrawerOpen);

    const [exercisesList, setExercisesList] = useState<Exercise[]>(
        exercises.map((exercise, index) => ({ ...exercise, index, selected: false })),
    );

    const deleteButtonDisabled = !exercisesList.some((exercise) => exercise.selected);

    const handleExerciseChange = (exercise: Exercise, index: number) => {
        setExercisesList(exercisesList.map((ex, i) => (i === index ? exercise : ex)));
    };

    const handleAddExercise = () => {
        setExercisesList([...exercisesList, newExerciseObj]);
    };

    const handleDeleteExercise = () => {
        const updatedExercises = exercisesList.filter((exercise) => !exercise.selected);

        setExercisesList(updatedExercises);
    };

    useEffect(() => {
        const exercisesFiltered = exercisesList.filter((exercise) => exercise.name);

        dispatch(setModifiedExercises(exercisesFiltered));
    }, [exercisesList, trainingToEdit, isDrawerOpen]);

    useEffect(() => {
        if (modifiedTraining && modifiedTraining.exercises.length === 0) {
            setExercisesList([newExerciseObj]);
        }
    }, [modifiedTraining, isDrawerOpen]);

    return (
        <React.Fragment>
            {exercisesList.map((exercise, i) => (
                <ExerciseItem
                    // eslint-disable-next-line react/no-array-index-key
                    key={exercise.name + i}
                    exercise={exercise}
                    index={i}
                    onExerciseChange={handleExerciseChange}
                />
            ))}
            <div className='drawer-exercise-buttons'>
                <Button
                    onClick={handleAddExercise}
                    icon={<PlusOutlined />}
                    className='drawer-exercise-button-add'
                >
                    {trainingButtonTitles.addMoreExercises}
                </Button>
                <Button
                    onClick={handleDeleteExercise}
                    icon={<MinusOutlined />}
                    disabled={deleteButtonDisabled}
                >
                    {trainingButtonTitles.deleteExercises}
                </Button>
            </div>
        </React.Fragment>
    );
};

export default ExerciseList;
