import { useEffect, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { ModalTypes, setCloseModal, setOpenModal } from '@redux/modals/modals-slice';
import {
    selectDefaultTrainings,
    selectSelectedDay,
    selectTodaysTrainings,
    selectTrainingToEdit,
    setModifiedExercises,
    setModifiedTraining,
    setTrainingToEdit,
} from '@redux/trainings/trainings-slice';
import { Button, Select } from 'antd';
import dayjs from 'dayjs';

import './create-training-modal-title.less';
import { DATE_DD_MM_YYYY } from '@constants/dates';

interface CreateTrainingModalTitleProps {
    defaultSelect: string;
    onChange: (selectedValue: string) => void;
}

const CreateTrainingModalTitle = ({ defaultSelect, onChange }: CreateTrainingModalTitleProps) => {
    const dispatch = useAppDispatch();

    const trainingToEdit = useAppSelector(selectTrainingToEdit);
    const todaysTrainings = useAppSelector(selectTodaysTrainings);
    const defaultTrainings = useAppSelector(selectDefaultTrainings);
    const selectedDay = useAppSelector(selectSelectedDay);

    const [selectedOption, setSelectedOption] = useState<string>(defaultSelect);

    const isToday = dayjs(selectedDay, DATE_DD_MM_YYYY).isSame(dayjs(), 'day');
    const isPast = dayjs(selectedDay, DATE_DD_MM_YYYY).isBefore(dayjs(), 'day') || isToday;

    const trainingsToSelect = isPast
        ? todaysTrainings.map((training) => training.name)
        : defaultTrainings.filter(
              (training) => !todaysTrainings.some((item) => item.name === training),
          );

    const selectItems = trainingsToSelect.map((element) => ({ label: element, value: element }));

    const handleSelectChange = (selectedValue: string) => {
        const training =
            todaysTrainings.find((training) => training.name === selectedValue) || null;
        setSelectedOption(selectedValue);
        onChange(selectedValue);
        dispatch(setTrainingToEdit(training));
        dispatch(setModifiedTraining(null));
    };

    const handleToggleCreateTrainingModal = () => {
        dispatch(setCloseModal(ModalTypes.calendarCreateTrainingModal));
        dispatch(setOpenModal(ModalTypes.calendarTrainingListModal));
        dispatch(setTrainingToEdit(null));
        dispatch(setModifiedTraining(null));
        dispatch(setModifiedExercises(null));
    };

    useEffect(() => {
        onChange(selectedOption);
    }, []);

    return (
        <div className='create-training-modal-title'>
            <Button
                type='text'
                size='small'
                icon={<ArrowLeftOutlined />}
                onClick={handleToggleCreateTrainingModal}
                data-test-id={DATA_TEST_ID.modalExerciseTrainingButtonClose}
            />
            <Select
                defaultValue={trainingToEdit?.name}
                className='dropdown-select'
                onChange={handleSelectChange}
                options={selectItems}
                value={trainingToEdit?.name || selectedOption}
                data-test-id={DATA_TEST_ID.modalCreateExerciseSelect}
            />
        </div>
    );
};

export default CreateTrainingModalTitle;
