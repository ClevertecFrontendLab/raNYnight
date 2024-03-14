import { FC } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { ModalTypes, toggleModal } from '@redux/modals/modals-slice';
import { setTrainingToEdit } from '@redux/trainings/trainings-slice';
import { NewTrainingResponse } from 'src/types/trainings';

export interface CalendarTrainingItemProps {
    training: NewTrainingResponse | null;
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

const CalendarTrainingItem: FC<CalendarTrainingItemProps> = ({ training, isEditable }) => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setTrainingToEdit(training));
        dispatch(toggleModal(ModalTypes.calendarCreateTrainingModal));
    };

    if (training) {
        const trainingKey: Trainings | undefined =
            Trainings[training.name as keyof typeof Trainings];
        return (
            <li className={`calendar-training-item ${trainingKey}`}>
                {training.name}
                {isEditable && (
                    <EditOutlined onClick={handleClick} className='training-edit-icon' />
                )}
            </li>
        );
    }
    return <></>;
};

export default CalendarTrainingItem;
