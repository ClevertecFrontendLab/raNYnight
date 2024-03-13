import { EditOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setIsDrawerOpen } from '@redux/trainings/trainings-slice';
import { Exercise } from 'src/types/trainings';

import './calendar-exercises-list.less';

interface CalendarExercisesListProps {
    exercises: Exercise[];
    isEditable: boolean;
}

const CalendarExercisesList = ({ exercises, isEditable }: CalendarExercisesListProps) => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setIsDrawerOpen(true));
    };

    return (
        <ul className='calendar-exercises-list'>
            {exercises.map((exercise: Exercise) => (
                <li className={`calendar-exercises-list-item`}>
                    {exercise.name}
                    {isEditable && (
                        <EditOutlined onClick={handleClick} className='exercises-edit-icon' />
                    )}
                </li>
            ))}
        </ul>
    );
};

export default CalendarExercisesList;
