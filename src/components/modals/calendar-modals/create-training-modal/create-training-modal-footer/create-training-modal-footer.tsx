import React, { FC } from 'react';
import { ModalTypes } from '@common-types/modal';
import Loader from '@components/loader/loader';
import { DATE_DD_MM_YYYY } from '@constants/dates';
import { trainingButtonTitles } from '@constants/trainings';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setActiveModal } from '@redux/modals/modal-manager';
import {
    useCreateTrainingMutation,
    useUpdateTrainingMutation,
} from '@redux/trainings/trainings-api';
import {
    selectModifiedTraining,
    selectSelectedDay,
    selectTrainingToEdit,
    setModifiedTraining,
    setShouldRefetchUserTrainings,
} from '@redux/trainings/trainings-slice';
import { Button } from 'antd';
import dayjs from 'dayjs';

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

    const [createTraining, { isLoading: isCreateLoading }] = useCreateTrainingMutation();
    const [updateTraining, { isLoading: isUpdateLoading }] = useUpdateTrainingMutation();

    const isFuture = dayjs(selectedDay, DATE_DD_MM_YYYY).isAfter(dayjs());

    const handleSaveSuccess = () => {
        dispatch(setShouldRefetchUserTrainings(true));
        dispatch(setActiveModal(ModalTypes.calendarTrainingListModal));
        dispatch(setModifiedTraining(null));
    };

    const handleSaveError = () => {
        dispatch(setModifiedTraining(null));
        dispatch(setActiveModal(ModalTypes.notificationErrorModal));
    };

    const handleSaveModifiedTraining = () => {
        if (modifiedTraining) {
            if (trainingToEdit) {
                // eslint-disable-next-line no-underscore-dangle
                updateTraining({ ...modifiedTraining, _id: trainingToEdit._id })
                    .unwrap()
                    .then(handleSaveSuccess)
                    .catch(() => handleSaveError());
            } else {
                createTraining(modifiedTraining)
                    .unwrap()
                    .then(handleSaveSuccess)
                    .catch(() => handleSaveError());
            }
        }
    };

    return (
        <React.Fragment>
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
                        !!(
                            modifiedTraining === null ||
                            (isFuture && modifiedTraining.exercises.length === 0)
                        )
                    }
                >
                    {isFuture
                        ? trainingButtonTitles.saveExercises
                        : trainingButtonTitles.savePastExercises}
                </Button>
            </div>
            {(isCreateLoading || isUpdateLoading) && <Loader />}
        </React.Fragment>
    );
};

export default CreateTrainingModalFooter;
