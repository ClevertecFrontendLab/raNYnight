import { FC, ReactNode, useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Exercise, ModifiedTraining, Trainings } from '@common-types/trainings';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { EXERCISE_DRAWER_WIDTH, EXERCISE_DRAWER_WIDTH_MOBILE } from '@constants/sizes';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    selectIsDrawerOpen,
    selectModifiedExercises,
    selectModifiedTraining,
    selectSelectedDay,
    selectTrainingToEdit,
    setIsDrawerOpen,
    setModifiedTraining,
} from '@redux/trainings/trainings-slice';
import { Button, Drawer, Typography } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import ExerciseList from './exercise-list/exercise-list';

import './exercise-drawer.less';
import { DATE_DDMMYYYY, DATE_DD_MM_YYYY } from '@constants/dates';
import { useWindowSize } from 'usehooks-ts';
import { BREAKPOINT_834 } from '@constants/breakpoints';

dayjs.extend(utc);

type ExerciseDrawerProps = {
    title: string;
    closeIcon?: ReactNode;
    selectedTraining: string;
};

const ExerciseDrawer: FC<ExerciseDrawerProps> = ({ title, closeIcon, selectedTraining }) => {
    const { width } = useWindowSize();
    const dispatch = useAppDispatch();
    const isDrawerOpen = useAppSelector(selectIsDrawerOpen);
    const trainingToEdit = useAppSelector(selectTrainingToEdit);
    const selectedDay = useAppSelector(selectSelectedDay);
    const modifiedTraining = useAppSelector(selectModifiedTraining);
    const modifiedExercises = useAppSelector(selectModifiedExercises);

    const isPast = dayjs(selectedDay, DATE_DD_MM_YYYY).isBefore(dayjs(), 'day');
    const isToday = dayjs(selectedDay, DATE_DD_MM_YYYY).isSame(dayjs(), 'day');
    const isImplementation = isPast || isToday;

    const newExerciseObj: Exercise = {
        name: '',
        replays: 1,
        weight: 0,
        approaches: 3,
        isImplementation: false,
        index: 0,
    };

    const newTrainingObj: ModifiedTraining = {
        name: selectedTraining,
        date: selectedDay as string,
        isImplementation: false,
        parameters: {
            repeat: false,
            period: null,
            jointTraining: false,
            participants: [],
        },
        exercises: [newExerciseObj],
    };
    const [trainingToUpdate, setTrainingToUpdate] = useState<ModifiedTraining>(newTrainingObj);

    const trainingKey: Trainings | undefined =
        Trainings[selectedTraining as keyof typeof Trainings];

    const handleCloseDrawer = () => {
        if (modifiedExercises) {
            const updatedTraining: ModifiedTraining = {
                ...trainingToUpdate,
                exercises: modifiedExercises,
                isImplementation,
            };
            dispatch(setModifiedTraining({ ...updatedTraining, exercises: modifiedExercises }));
        }
        dispatch(setIsDrawerOpen(false));
    };

    useEffect(() => {
        const newTrainingToUpdate = modifiedTraining
            ? { ...modifiedTraining }
            : trainingToEdit
            ? { ...trainingToEdit }
            : newTrainingObj;
        setTrainingToUpdate(newTrainingToUpdate);
    }, [modifiedTraining, trainingToEdit]);

    return (
        <Drawer
            mask={true}
            maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            title={title}
            destroyOnClose
            placement='right'
            closable={true}
            closeIcon={closeIcon}
            open={isDrawerOpen}
            className={'exercise-drawer'}
            width={width > BREAKPOINT_834 ? EXERCISE_DRAWER_WIDTH : EXERCISE_DRAWER_WIDTH_MOBILE}
            extra={
                <Button
                    type='text'
                    size='middle'
                    icon={<CloseOutlined />}
                    onClick={handleCloseDrawer}
                    data-test-id={DATA_TEST_ID.modalDrawerRightButtonClose}
                />
            }
            data-test-id={DATA_TEST_ID.modalDrawerRight}
        >
            <div className='drawer-exercise-header'>
                <li className={`calendar-training-item ${trainingKey}`}>{selectedTraining}</li>
                <Typography.Text className='drawer-exercise-header-date'>
                    {dayjs(selectedDay, DATE_DD_MM_YYYY).format(DATE_DDMMYYYY)}
                </Typography.Text>
            </div>
            <ExerciseList exercises={trainingToUpdate.exercises} />
        </Drawer>
    );
};

export default ExerciseDrawer;
