import { FC, useEffect, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    selectModifiedTraining,
    selectTrainingToEdit,
    setIsDrawerOpen,
} from '@redux/trainings/trainings-slice';
import { Button } from 'antd';
import { Exercise } from 'src/types/trainings';

import './calendar-exercises-list.less';

const CalendarExercisesList: FC = () => {
    const dispatch = useAppDispatch();

    const modifiedTraining = useAppSelector(selectModifiedTraining);
    const trainingToEdit = useAppSelector(selectTrainingToEdit);
    const [exercisesToList, setExercisesToList] = useState<Exercise[]>([]);

    const handleClick = () => {
        dispatch(setIsDrawerOpen(true));
    };

    useEffect(() => {
        const newExercises = modifiedTraining
            ? modifiedTraining.exercises
            : trainingToEdit
            ? trainingToEdit.exercises
            : [];
        setExercisesToList(newExercises);
    }, [modifiedTraining, trainingToEdit]);

    return (
        <ul className='calendar-exercises-list'>
            {exercisesToList.map((exercise: Exercise, i) => (
                <li className={`calendar-exercises-list-item`} key={i}>
                    {exercise.name}
                    <Button
                        onClick={handleClick}
                        className={`training-edit-icon-button `}
                        data-test-id={`${DATA_TEST_ID.modalUpdateTrainingEditButton}${i}`}
                    >
                        <EditOutlined className='training-edit-icon' />
                    </Button>
                </li>
            ))}
        </ul>
    );
};

export default CalendarExercisesList;
