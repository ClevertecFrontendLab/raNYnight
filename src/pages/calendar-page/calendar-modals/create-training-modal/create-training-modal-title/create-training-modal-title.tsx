import { ArrowLeftOutlined } from '@ant-design/icons';
import { defaultTrainings } from '@constants/trainings';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { ModalTypes, toggleModal } from '@redux/modals/modals-slice';
import { selectTodaysTrainings, setTrainingToEdit } from '@redux/trainings/trainings-slice';
import { Button, Select } from 'antd';
import { useState } from 'react';
import './create-training-modal-title.less';

interface CreateTrainingModalTitleProps {
    defaultSelect: string;
    onChange: (selectedValue: string) => void;
}

const CreateTrainingModalTitle = ({ defaultSelect, onChange }: CreateTrainingModalTitleProps) => {
    const dispatch = useAppDispatch();
    const todaysTrainings = useAppSelector(selectTodaysTrainings);
    const [selectedOption, setSelectedOption] = useState<string>(defaultSelect);

    const selectItems = defaultTrainings
        .filter((training) => !todaysTrainings.some((item) => item.name === training))
        .map((element) => ({ label: element, value: element }));

    const handleSelectChange = (selectedValue: string) => {
        setSelectedOption(selectedValue);
        onChange(selectedValue);
        dispatch(setTrainingToEdit(null));
    };

    const handleToggleCreateTrainingModal = () => {
        dispatch(toggleModal(ModalTypes.calendarCreateTrainingModal));
        dispatch(setTrainingToEdit(null));
    };
    return (
        <div className='create-training-modal-title'>
            <Button
                type='text'
                size='small'
                icon={<ArrowLeftOutlined />}
                onClick={handleToggleCreateTrainingModal}
            />
            <Select
                defaultValue={selectedOption}
                className='dropdown-select'
                onChange={handleSelectChange}
                options={selectItems}
                value={selectedOption}
            />
        </div>
    );
};

export default CreateTrainingModalTitle;
