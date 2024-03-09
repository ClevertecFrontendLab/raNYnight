import { Modal } from 'antd';
import dayjs from 'dayjs';

import CalendarTrainingList from '@pages/calendar-page/calendar-training-list/calendar-training-list';
import { NewTrainingResponse } from 'src/types/trainings';
import './training-list-modal.less';

interface TrainingListModalProps {
    date: dayjs.Dayjs;
    trainings: NewTrainingResponse[];
    isModalOpen: boolean;
    onClose: () => void;
    position: {
        top: number;
        left: number;
    };
}

const TrainingListModal = ({
    date,
    trainings,
    isModalOpen,
    onClose,
    position,
}: TrainingListModalProps) => {
    return (
        <Modal
            title={`Тренировки на ${date.format('DD.MM.YYYY')}`}
            okText='Добавить тренировку'
            onOk={() => console.log('open drawer')}
            onCancel={onClose}
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { width: '100%', margin: 0 } }}
            open={isModalOpen}
            className='training-list-modal'
            width={264}
            mask={false}
            style={{ top: position.top, left: position.left }}
        >
            <CalendarTrainingList trainings={trainings} isEditable={true} date={date} />
        </Modal>
    );
};

export default TrainingListModal;
