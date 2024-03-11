import { FC, ReactNode } from 'react';
import './exercise-drawer.less';
import { Button, Drawer } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectIsDrawerOpen, selectTrainingToEdit } from '@redux/trainings/trainings-slice';
import ExerciseItem from './exercise-item/exercise-item';

type ExerciseDrawerProps = {
    title: string;
    onClose: () => void;
    open?: boolean;
    children?: ReactNode;
    closeIcon?: ReactNode;
};

const ExerciseDrawer: FC<ExerciseDrawerProps> = ({ title, open, children, onClose, closeIcon }) => {
    const isDrawerOpen = useAppSelector(selectIsDrawerOpen);
    const trainingToEdit = useAppSelector(selectTrainingToEdit);
    return (
        <Drawer
            title={title}
            destroyOnClose={true}
            placement='right'
            closable={true}
            // zIndex={1001}
            closeIcon={closeIcon}
            open={isDrawerOpen}
            className={'exercise-drawer'}
            width={360}
            extra={<Button type='text' size='middle' icon={<CloseOutlined />} onClick={onClose} />}
        >
            {trainingToEdit &&
                trainingToEdit.exercises.map((exercise) => (
                    <ExerciseItem exercise={exercise} key={exercise._id} />
                ))}
        </Drawer>
    );
};

export default ExerciseDrawer;
