import { useState } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { ModalTypes } from '@common-types/modal';
import { BREAKPOINT_768 } from '@constants/breakpoints';
import { DATA_TEST_ID } from '@constants/data-test-id';
import {
    CALENDAR_TRAINING_MODAL_WIDTH,
    CALENDAR_TRAINING_MODAL_WIDTH_MOBILE,
} from '@constants/sizes';
import { trainingButtonTitles, trainingDrawerTitles } from '@constants/trainings';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import CalendarExercisesList from '@pages/calendar-page/calendar-exercises-list/calendar-exercises-list';
import ExerciseDrawer from '@pages/calendar-page/exercise-drawer/exercise-drawer';
import { selectActiveModal } from '@redux/modals/modal-manager';
import {
    selectCellPosition,
    selectTrainingToEdit,
    setIsDrawerOpen,
} from '@redux/trainings/trainings-slice';
import { Modal } from 'antd';
import { useWindowSize } from 'usehooks-ts';

import CreateTrainingModalFooter from './create-training-modal-footer/create-training-modal-footer';
import CreateTrainingModalTitle from './create-training-modal-title/create-training-modal-title';

import './create-training-modal.less';

const CreateTrainingModal = () => {
    const dispatch = useAppDispatch();
    const { width } = useWindowSize();

    const trainingToEdit = useAppSelector(selectTrainingToEdit);
    const isCreateTrainingModalOpen =
        useAppSelector(selectActiveModal) === ModalTypes.calendarCreateTrainingModal;
    const cellPosition = useAppSelector(selectCellPosition);

    const [selectedOption, setSelectedOption] = useState<string>(
        trainingToEdit !== null ? trainingToEdit.name : trainingButtonTitles.selectTraining,
    );

    const handleOpenDrawer = () => dispatch(setIsDrawerOpen(true));

    const handleDropdownChange = (selectedOption: string) => setSelectedOption(selectedOption);

    return (
        <>
            <Modal
                closeIcon={<CloseOutlined />}
                data-test-id={DATA_TEST_ID.modalCreateExercise}
                title={
                    <CreateTrainingModalTitle
                        defaultSelect={
                            trainingToEdit !== null
                                ? trainingToEdit.name
                                : trainingButtonTitles.selectTraining
                        }
                        onChange={handleDropdownChange}
                    />
                }
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { width: '100%', margin: 0 } }}
                open={isCreateTrainingModalOpen}
                className='training-list-modal'
                width={
                    width > BREAKPOINT_768
                        ? CALENDAR_TRAINING_MODAL_WIDTH
                        : CALENDAR_TRAINING_MODAL_WIDTH_MOBILE
                }
                mask={false}
                closable={false}
                style={{ top: cellPosition.top, left: cellPosition.left }}
                maskClosable={false}
                destroyOnClose={true}
                footer={
                    <CreateTrainingModalFooter
                        onAddExercisesClick={handleOpenDrawer}
                        isAddButtonDisabled={selectedOption === trainingButtonTitles.selectTraining}
                    />
                }
                key={`create-training-modal ${trainingToEdit?._id}`}
            >
                <CalendarExercisesList />
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
