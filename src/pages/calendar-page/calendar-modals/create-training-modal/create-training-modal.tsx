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

interface CreateTrainingModalProps {
    date: dayjs.Dayjs;
    trainings: NewTrainingResponse[];
    isModalOpen: boolean;
    onClose: () => void;
    position: {
        top: number;
        left: number;
    };
    body: React.ReactNode;
}

const CreateTrainingModal = ({
    date,
    trainings,
    isModalOpen,
    onClose,
    position,
    body,
}: CreateTrainingModalProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };

    const handleOpenDrawer = () => {
        setIsDrawerOpen(true);
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
                        <DropdownSelect />
                    </div>
                }
                okText='Добавить упражнения'
                onOk={handleOpenDrawer}
                onCancel={onClose}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { width: '100%', margin: 0 } }}
                open={isModalOpen}
                className='training-list-modal'
                width={264}
                mask={false}
                style={{ top: position.top, left: position.left }}
                closable={false}
                maskClosable={false}
            >
                {body}
            </Modal>

            <ExerciseDrawer
                title={drawerTitles.addNew}
                open={isDrawerOpen}
                onClose={handleCloseDrawer}
                closeIcon={<PlusOutlined />}
            >
                <div className='form'>FORMA</div>
            </ExerciseDrawer>
        </>
    );
};

export default CreateTrainingModal;
