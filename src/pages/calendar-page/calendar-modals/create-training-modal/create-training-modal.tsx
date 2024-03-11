import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { NewTrainingResponse } from 'src/types/trainings';
import { Button, Modal } from 'antd';
import ExerciseDrawer from '@pages/calendar-page/exercise-drawer/exercise-drawer';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { drawerTitles } from '@constants/drawer';
import DropdownSelect from './dropdown-select/dropdown-select';
import { title } from 'process';

import './create-training-modal.less';
import ExerciseItem from '@pages/calendar-page/exercise-drawer/exercise-item/exercise-item';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTrainingToEdit, setIsDrawerOpen } from '@redux/trainings/trainings-slice';
import { selectModalByType, ModalTypes, toggleModal } from '@redux/modals/modals-slice';

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

    const isCreateTrainingModalOpen = useAppSelector(
        selectModalByType(ModalTypes.calendarCreateTrainingModal),
    );

    const trainingToEdit = useAppSelector(selectTrainingToEdit);
    const [selectedTraining, setSelectedTraining] = useState<NewTrainingResponse | null>(null);

    const handleCloseDrawer = () => {
        dispatch(setIsDrawerOpen(false));
    };

    const handleOpenDrawer = () => {
        dispatch(setIsDrawerOpen(true));
    };

    const handleDropdownChange = (selectedValue: string) => {
        console.log('Выбранное значение:', selectedValue);
        setSelectedTraining(trainings.filter((training) => training.name === selectedValue)[0]);
    };

    const handleAddExercise = () => {
        handleOpenDrawer();
    };

    const handleToggleCreateTrainingModal = () => {
        dispatch(toggleModal(ModalTypes.calendarCreateTrainingModal));
    };

    return (
        <>
            <Modal
                title={
                    <div className='create-training-modal-title'>
                        <Button
                            type='text'
                            size='small'
                            icon={<ArrowLeftOutlined />}
                            onClick={handleToggleCreateTrainingModal}
                        />
                        <DropdownSelect onChange={handleDropdownChange} />
                    </div>
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
            />

            <ExerciseDrawer
                title={drawerTitles.addNew}
                onClose={handleCloseDrawer}
                closeIcon={<PlusOutlined />}
            />
        </>
    );
};

export default CreateTrainingModal;
