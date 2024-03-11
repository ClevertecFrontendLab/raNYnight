import { EditOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setIsDrawerOpen, setTrainingToEdit } from '@redux/trainings/trainings-slice';
import { NewTrainingResponse } from 'src/types/trainings';

export interface CalendarTrainingItemProps {
    training: NewTrainingResponse;
    isEditable: boolean;
}

export enum Trainings {
    Силовая = 'strength',
    Ноги = 'legs',
    Руки = 'hands',
    Грудь = 'chest',
    Спина = 'back',
    Кардио = 'cardio',
}

const CalendarTrainingItem = ({ training, isEditable }: CalendarTrainingItemProps) => {
    const dispatch = useAppDispatch();
    const trainingKey: Trainings | undefined = Trainings[training.name as keyof typeof Trainings];

    const handleClick = () => {
        dispatch(setTrainingToEdit(training));
        dispatch(setIsDrawerOpen(true));
    };

    return (
        <li className={`calendar-training-item ${trainingKey}`}>
            {training.name}{' '}
            {isEditable && <EditOutlined onClick={handleClick} className='training-edit-icon' />}
        </li>
    );
};

export default CalendarTrainingItem;
