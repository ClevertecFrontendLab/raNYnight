import { PlusOutlined } from '@ant-design/icons';
import ExerciseDrawer from '@pages/calendar-page/exercise-drawer/exercise-drawer';
import { Modal } from 'antd';

import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import CalendarExercisesList from '@pages/calendar-page/calendar-exercises-list/calendar-exercises-list';
import { ModalTypes, selectModalByType } from '@redux/modals/modals-slice';
import { selectTrainingToEdit, setIsDrawerOpen } from '@redux/trainings/trainings-slice';
import { useState } from 'react';
import CreateTrainingModalFooter from './create-training-modal-footer/create-training-modal-footer';
import CreateTrainingModalTitle from './create-training-modal-title/create-training-modal-title';
import './create-training-modal.less';
import { trainingButtonTitles, trainingDrawerTitles } from '@constants/trainings';

interface CreateTrainingModalProps {
    position: {
        top: number;
        left: number;
    };
}

const CreateTrainingModal = ({ position }: CreateTrainingModalProps) => {
    const dispatch = useAppDispatch();
    const trainingToEdit = useAppSelector(selectTrainingToEdit);
    const [selectedOption, setSelectedOption] = useState<string>(
        trainingToEdit ? trainingToEdit.name : trainingButtonTitles.selectTraining,
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
                title={
                    <CreateTrainingModalTitle
                        defaultSelect={trainingToEdit?.name || trainingButtonTitles.selectTraining}
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
                    exercises={trainingToEdit?.exercises || []}
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
