import { trainingButtonTitles } from '@constants/trainings';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectModifiedTraining } from '@redux/trainings/trainings-slice';
import { Button } from 'antd';
import { FC } from 'react';

interface CreateTrainingModalFooterProps {
    onAddExercisesClick: () => void;
    isAddButtonDisabled: boolean;
}
const CreateTrainingModalFooter: FC<CreateTrainingModalFooterProps> = ({
    onAddExercisesClick,
    isAddButtonDisabled,
}) => {
    const modifiedTraining = useAppSelector(selectModifiedTraining);
    return (
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
                onClick={() => console.log('save and close drawer')}
                className='create-training-footer-save-btn'
                disabled={modifiedTraining === null ? true : false}
            >
                {trainingButtonTitles.saveExercises}
            </Button>
        </div>
    );
};

export default CreateTrainingModalFooter;
