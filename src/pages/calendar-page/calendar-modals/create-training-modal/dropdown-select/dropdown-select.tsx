import { defaultTrainings } from '@constants/trainings';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTodaysTrainings, selectTrainingToEdit } from '@redux/trainings/trainings-slice';
import { Select } from 'antd';
import { FC, useState } from 'react';
import './dropdown-select.less';

interface DropdownSelectProps {
    onChange: (selectedValue: string) => void;
}

const DropdownSelect: FC<DropdownSelectProps> = ({ onChange }) => {
    const todaysTrainings = useAppSelector(selectTodaysTrainings);
    const trainingToEdit = useAppSelector(selectTrainingToEdit);
    const [selectedOption, setSelectedOption] = useState<string>(
        trainingToEdit?.name || 'Выбор типа тренировки',
    );

    const selectItems = defaultTrainings
        .filter((training) => !todaysTrainings.some((item) => item.name === training))
        .map((element) => ({ label: element, value: element }));

    const handleSelectChange = (selectedValue: string) => {
        setSelectedOption(selectedValue);
        if (onChange) {
            onChange(selectedValue);
        }
    };

    return (
        <Select
            defaultValue='Выбор типа тренировки'
            className='dropdown-select'
            onChange={handleSelectChange}
            options={selectItems}
            value={selectedOption}
        />
    );
};

export default DropdownSelect;
