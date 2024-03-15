import { FC } from 'react';
import Loader from '@components/loader/loader';
import { trainingButtonTitles } from '@constants/trainings';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    useCreateTrainingMutation,
    useUpdateTrainingMutation,
} from '@redux/trainings/trainings-api';
import {
    selectModifiedTraining,
    selectTrainingToEdit,
    setModifiedTraining,
} from '@redux/trainings/trainings-slice';
import { Button } from 'antd';
import { setShouldRefetch } from '@redux/auth/auth-slice';
import { ModalTypes, toggleModal } from '@redux/modals/modals-slice';

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

    const [createTraining, { isLoading: isCreateLoading }] = useCreateTrainingMutation();
    const [updateTraining, { isLoading: isUpdateLoading }] = useUpdateTrainingMutation();

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
                    .then(handleSaveSuccess);
            } else {
                createTraining(modifiedTraining).unwrap().then(handleSaveSuccess);
            }
        }
    };
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
                    disabled={modifiedTraining === null ? true : false}
                >
                    {trainingButtonTitles.saveExercises}
                </Button>
            </div>
            {(isCreateLoading || isUpdateLoading) && <Loader />}
            {/* <Loader /> */}
        </>
    );
};

export default CreateTrainingModalFooter;
