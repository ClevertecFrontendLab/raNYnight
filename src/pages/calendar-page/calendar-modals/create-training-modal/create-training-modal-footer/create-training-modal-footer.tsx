import { FC, useEffect, useState } from 'react';
import Loader from '@components/loader/loader';
import { trainingButtonTitles } from '@constants/trainings';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    useCreateTrainingMutation,
    useUpdateTrainingMutation,
} from '@redux/trainings/trainings-api';
import {
    selectModifiedTraining,
    selectSelectedDay,
    selectTrainingToEdit,
    setModifiedTraining,
} from '@redux/trainings/trainings-slice';
import { Button } from 'antd';
import { setShouldRefetch } from '@redux/auth/auth-slice';
import {
    ModalTypes,
    selectModalByType,
    setAllModalsToFalse,
    setCloseModal,
    setOpenModal,
    toggleModal,
} from '@redux/modals/modals-slice';
import dayjs from 'dayjs';
import { NotificationModal } from '../../notification-modal/notification-modal';

interface CreateTrainingModalFooterProps {
    onAddExercisesClick: () => void;
    isAddButtonDisabled: boolean;
}
const CreateTrainingModalFooter: FC<CreateTrainingModalFooterProps> = ({
    onAddExercisesClick,
    isAddButtonDisabled,
}) => {
    const dispatch = useAppDispatch();
    const modifiedTraining = useAppSelector(selectModifiedTraining);
    const trainingToEdit = useAppSelector(selectTrainingToEdit);
    const selectedDay = useAppSelector(selectSelectedDay);

    const [openNotificationErrorModal, setOpenNotificationErrorModal] = useState(false);

    const [createTraining, { isLoading: isCreateLoading }] = useCreateTrainingMutation();
    const [updateTraining, { isLoading: isUpdateLoading }] = useUpdateTrainingMutation();

    const isFuture = dayjs(selectedDay, 'DD-MM-YYYY').isAfter(dayjs());

    const handleSaveSuccess = () => {
        dispatch(setShouldRefetch(true));
        dispatch(toggleModal(ModalTypes.calendarCreateTrainingModal));
        dispatch(setModifiedTraining(null));
    };

    const handleSaveModifiedTraining = () => {
        if (modifiedTraining) {
            if (trainingToEdit) {
                updateTraining({ ...modifiedTraining, _id: trainingToEdit._id })
                    .unwrap()
                    .then(handleSaveSuccess)
                    .catch(() => setOpenNotificationErrorModal(true));
            } else {
                createTraining(modifiedTraining)
                    .unwrap()
                    .then(handleSaveSuccess)
                    .catch(() => setOpenNotificationErrorModal(true));
            }
        }
    };

    const handleCloseNotificationErrorModal = () => {
        setOpenNotificationErrorModal(false);
        dispatch(setAllModalsToFalse());
    };

    // useEffect(() => {
    //     if (isCreateError || isUpdateError) {
    //         setOpenNotificationErrorModal(true);
    //     }
    // }, [isCreateError, isUpdateError]);

    return (
        <>
            <div className='create-training-modal-footer'>
                <Button
                    type='text'
                    onClick={onAddExercisesClick}
                    className='create-training-footer-add-btn'
                    disabled={isAddButtonDisabled}
                >
                    {trainingButtonTitles.addExercises}
                </Button>
                <Button
                    type='text'
                    onClick={handleSaveModifiedTraining}
                    className='create-training-footer-save-btn'
                    disabled={
                        modifiedTraining === null ||
                        (isFuture && modifiedTraining.exercises.length === 0)
                            ? true
                            : false
                    }
                >
                    {trainingButtonTitles.saveExercises}
                </Button>
            </div>
            {(isCreateLoading || isUpdateLoading) && <Loader />}
            <NotificationModal
                textButton='Закрыть'
                onClickButton={handleCloseNotificationErrorModal}
                type='error'
                isCloseIcon={false}
                title='При сохранении данных произошла ошибка'
                subtitle='Придётся попробовать ещё раз'
                open={openNotificationErrorModal}
            />
        </>
    );
};

export default CreateTrainingModalFooter;
