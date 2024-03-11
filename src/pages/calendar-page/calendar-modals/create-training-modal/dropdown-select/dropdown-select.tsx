import { defaultTrainings } from '@constants/trainings';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTodaysTrainings } from '@redux/trainings/trainings-slice';
import { Select } from 'antd';

const DropdownSelect = () => {
    const todaysTrainings = useAppSelector(selectTodaysTrainings);

    const selectItems = defaultTrainings
        .filter((training) => !todaysTrainings.some((item) => item.name === training))
        .map((element) => ({ label: element, value: element }));

    return (
        <Select
            defaultValue='Выбор типа тренировки'
            className='dropdown-select'
            // onChange={onChange}
            options={selectItems}
        />
    );
};

export default DropdownSelect;
