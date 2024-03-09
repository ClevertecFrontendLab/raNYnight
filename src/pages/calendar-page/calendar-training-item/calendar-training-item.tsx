import { EditOutlined } from '@ant-design/icons';
import { NewTrainingResponse } from 'src/types/trainings';

export interface CalendarTrainingItemProps {
    training: NewTrainingResponse;
    onEdit: () => void;
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

const CalendarTrainingItem = ({ training, onEdit, isEditable }: CalendarTrainingItemProps) => {
    const trainingKey: Trainings | undefined = Trainings[training.name as keyof typeof Trainings];

    return (
        <li className={`calendar-training-item ${trainingKey}`}>
            {training.name}{' '}
            {isEditable && <EditOutlined onClick={onEdit} className='training-edit-icon' />}
        </li>
    );
};

export default CalendarTrainingItem;
