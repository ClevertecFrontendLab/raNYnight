import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { trainingButtonTitles, trainingDrawerTitles } from '@constants/trainings';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import CalendarExercisesList from '@pages/calendar-page/calendar-exercises-list/calendar-exercises-list';
import ExerciseDrawer from '@pages/calendar-page/exercise-drawer/exercise-drawer';
import { ModalTypes, selectModalByType } from '@redux/modals/modals-slice';
import {
    selectModifiedTraining,
    selectTrainingToEdit,
    setIsDrawerOpen,
} from '@redux/trainings/trainings-slice';
import { Modal } from 'antd';

import CreateTrainingModalFooter from './create-training-modal-footer/create-training-modal-footer';
import CreateTrainingModalTitle from './create-training-modal-title/create-training-modal-title';

import './create-training-modal.less';
import { DATA_TEST_ID } from '@constants/data-test-id';

interface CreateTrainingModalProps {
    position: {
        top: number;
        left: number;
    };
}

const CreateTrainingModal = ({ position }: CreateTrainingModalProps) => {
    const dispatch = useAppDispatch();

    const trainingToEdit = useAppSelector(selectTrainingToEdit);
    const modifiedTraining = useAppSelector(selectModifiedTraining);

    const modifiedExercises = modifiedTraining?.exercises;
    const exercisecToEdit = trainingToEdit?.exercises;

    const [selectedOption, setSelectedOption] = useState<string>(
        trainingToEdit !== null ? trainingToEdit.name : trainingButtonTitles.selectTraining,
    );

    const isCreateTrainingModalOpen = useAppSelector(
        selectModalByType(ModalTypes.calendarCreateTrainingModal),
    );

    const handleOpenDrawer = () => {
        dispatch(setIsDrawerOpen(true));
    };

    const handleDropdownChange = (selectedOption: string) => {
        console.log('handleDropdownChange', selectedOption);
        setSelectedOption(selectedOption);
    };

    return (
        <>
            <Modal
                data-test-id={DATA_TEST_ID.modalCreateExercise}
                title={
                    <CreateTrainingModalTitle
                        defaultSelect={selectedOption}
                        onChange={handleDropdownChange}
                    />
                }
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { width: '100%', margin: 0 } }}
                open={isCreateTrainingModalOpen}
                className='training-list-modal'
                width={264}
                mask={false}
                closable={false}
                style={{ top: position.top, left: position.left }}
                maskClosable={false}
                destroyOnClose
                footer={
                    <CreateTrainingModalFooter
                        onAddExercisesClick={handleOpenDrawer}
                        isAddButtonDisabled={selectedOption === trainingButtonTitles.selectTraining}
                    />
                }
                key={`create-training-modal ${trainingToEdit?._id}`}
            >
                <CalendarExercisesList
                    exercises={modifiedExercises ?? exercisecToEdit ?? []}
                    isEditable={true}
                />
            </Modal>

            <ExerciseDrawer
                selectedTraining={selectedOption}
                title={trainingToEdit ? trainingDrawerTitles.edit : trainingDrawerTitles.addNew}
                closeIcon={<PlusOutlined />}
            />
        </>
    );
};

export default CreateTrainingModal;
