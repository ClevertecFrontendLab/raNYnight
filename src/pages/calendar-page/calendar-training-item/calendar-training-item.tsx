import { EditOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { ModalTypes, setCloseModal, setOpenModal } from '@redux/modals/modals-slice';
import { setTrainingToEdit } from '@redux/trainings/trainings-slice';
import { FC } from 'react';
import { ModifiedTraining } from 'src/types/trainings';

import { DATA_TEST_ID } from '@constants/data-test-id';
import './calendar-training-item.less';
import { Button } from 'antd';

export interface CalendarTrainingItemProps {
    index: number;
    training: ModifiedTraining | null;
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

const CalendarTrainingItem: FC<CalendarTrainingItemProps> = ({ training, isEditable, index }) => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        if (training?.isImplementation) {
            return;
        }
        dispatch(setTrainingToEdit(training));
        dispatch(setCloseModal(ModalTypes.calendarTrainingListModal));

        setTimeout(() => {
            dispatch(setOpenModal(ModalTypes.calendarCreateTrainingModal));
        }, 20);
    };

    if (training) {
        const trainingKey: Trainings | undefined =
            Trainings[training.name as keyof typeof Trainings];
        return (
            <li
                className={`calendar-training-item ${trainingKey} ${
                    training.isImplementation ? 'implemented' : ''
                }`}
            >
                {training.name}
                {isEditable && (
                    <Button
                        className={`training-edit-icon-button  ${
                            training.isImplementation ? 'implemented' : ''
                        }`}
                        disabled={training.isImplementation}
                        onClick={handleClick}
                        data-test-id={`${DATA_TEST_ID.modalUpdateTrainingEditButton}${index}`}
                    >
                        <EditOutlined
                            className={`training-edit-icon ${
                                training.isImplementation ? 'implemented' : ''
                            }`}
                        />
                    </Button>
                )}
            </li>
        );
    }
    return <></>;
};

export default CalendarTrainingItem;
