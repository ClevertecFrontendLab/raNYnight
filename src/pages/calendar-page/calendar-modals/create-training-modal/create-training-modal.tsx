import { useState } from 'react';
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
import { selectModalByType, ModalTypes } from '@redux/modals/modals-slice';

interface CreateTrainingModalProps {
    date: dayjs.Dayjs;
    trainings: NewTrainingResponse[];
    onClose: () => void;
    position: {
        top: number;
        left: number;
    };
}

const CreateTrainingModal = ({ trainings, onClose, position }: CreateTrainingModalProps) => {
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

    return (
        <>
            <Modal
                title={
                    <div className='create-training-modal-title'>
                        <Button
                            type='text'
                            size='small'
                            icon={<ArrowLeftOutlined />}
                            onClick={onClose}
                        />
                        <DropdownSelect onChange={handleDropdownChange} />
                    </div>
                }
                onCancel={onClose}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { width: '100%', margin: 0 } }}
                open={isCreateTrainingModalOpen}
                className='training-list-modal'
                width={264}
                mask={false}
                style={{ top: position.top, left: position.left }}
                closable={false}
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
            ></Modal>

            <ExerciseDrawer
                title={drawerTitles.addNew}
                onClose={handleCloseDrawer}
                closeIcon={<PlusOutlined />}
            />
        </>
    );
};

export default CreateTrainingModal;
