import { useEffect, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { ModalTypes, toggleModal } from '@redux/modals/modals-slice';
import {
    selectDefaultTrainings,
    selectSelectedDay,
    selectTodaysTrainings,
    selectTrainingToEdit,
    setModifiedTraining,
    setTrainingToEdit,
} from '@redux/trainings/trainings-slice';
import { Button, Select } from 'antd';

import './create-training-modal-title.less';
import dayjs from 'dayjs';

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

    const isToday = dayjs(selectedDay, 'DD-MM-YYYY').isSame(dayjs(), 'day');
    const isPast = dayjs(selectedDay, 'DD-MM-YYYY').isBefore(dayjs(), 'day') || isToday;

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
        dispatch(toggleModal(ModalTypes.calendarCreateTrainingModal));
        dispatch(setTrainingToEdit(null));
        dispatch(setModifiedTraining(null));
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
            />
            <Select
                defaultValue={trainingToEdit?.name}
                className='dropdown-select'
                onChange={handleSelectChange}
                options={selectItems}
                value={trainingToEdit?.name || selectedOption}
            />
        </div>
    );
};

export default CreateTrainingModalTitle;
