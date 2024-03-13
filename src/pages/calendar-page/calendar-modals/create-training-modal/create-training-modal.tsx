import { PlusOutlined } from '@ant-design/icons';
import { drawerTitles } from '@constants/drawer';
import ExerciseDrawer from '@pages/calendar-page/exercise-drawer/exercise-drawer';
import { Button, Modal } from 'antd';
import dayjs from 'dayjs';
import { NewTrainingResponse } from 'src/types/trainings';

import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import CalendarExercisesList from '@pages/calendar-page/calendar-exercises-list/calendar-exercises-list';
import { ModalTypes, selectModalByType, toggleModal } from '@redux/modals/modals-slice';
import {
    selectTrainingToEdit,
    setIsDrawerOpen,
    setTrainingToEdit,
} from '@redux/trainings/trainings-slice';
import CreateTrainingModalTitle from './create-training-modal-title/create-training-modal-title';
import './create-training-modal.less';
import { useEffect, useState } from 'react';

interface CreateTrainingModalProps {
    date: dayjs.Dayjs;
    trainings: NewTrainingResponse[];
    position: {
        top: number;
        left: number;
    };
}

const CreateTrainingModal = ({ trainings, position }: CreateTrainingModalProps) => {
    const dispatch = useAppDispatch();
    const trainingToEdit = useAppSelector(selectTrainingToEdit);
    const [selectedOption, setSelectedOption] = useState<string>(
        trainingToEdit ? trainingToEdit.name : 'Выбор тренировки',
    );

    const isCreateTrainingModalOpen = useAppSelector(
        selectModalByType(ModalTypes.calendarCreateTrainingModal),
    );

    const handleCloseDrawer = () => {
        dispatch(setIsDrawerOpen(false));
    };

    const handleOpenDrawer = () => {
        dispatch(setIsDrawerOpen(true));
    };

    const handleAddExercise = () => {
        handleOpenDrawer();
    };

    const handleToggleCreateTrainingModal = () => {
        dispatch(toggleModal(ModalTypes.calendarCreateTrainingModal));
        dispatch(setTrainingToEdit(null));
    };

    const handleDropdownChange = (selectedOption: string) => {
        setSelectedOption(selectedOption);
    };

    return (
        <>
            <Modal
                title={
                    <CreateTrainingModalTitle
                        defaultSelect={trainingToEdit?.name || 'Выбор тренировки'}
                        onChange={handleDropdownChange}
                    />
                }
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { width: '100%', margin: 0 } }}
                open={isCreateTrainingModalOpen}
                className='training-list-modal'
                width={264}
                mask={false}
                onCancel={handleToggleCreateTrainingModal}
                closable={false}
                style={{ top: position.top, left: position.left }}
                maskClosable={false}
                destroyOnClose
                footer={
                    <div className='create-training-modal-footer'>
                        <Button
                            type='text'
                            onClick={handleAddExercise}
                            className='create-training-footer-add-btn'
                        >
                            Добавить упражнения
                        </Button>
                        <Button
                            type='text'
                            onClick={() => console.log('save and close drawer')}
                            className='create-training-footer-save-btn'
                        >
                            Сохранить
                        </Button>
                    </div>
                }
                key={'create-training-modal'}
            >
                <CalendarExercisesList
                    exercises={trainingToEdit?.exercises || []}
                    isEditable={true}
                />
            </Modal>

            <ExerciseDrawer
                title={drawerTitles.addNew}
                onClose={handleCloseDrawer}
                closeIcon={<PlusOutlined />}
            />
        </>
    );
};

export default CreateTrainingModal;
