import { EditOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setIsDrawerOpen } from '@redux/trainings/trainings-slice';
import { Exercise } from 'src/types/trainings';

import './calendar-exercises-list.less';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { Button } from 'antd';

interface CalendarExercisesListProps {
    exercises: Exercise[];
}

const CalendarExercisesList = ({ exercises }: CalendarExercisesListProps) => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setIsDrawerOpen(true));
    };

    return (
        <ul className='calendar-exercises-list'>
            {exercises.map((exercise: Exercise, i) => (
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
