import { FC, ReactNode } from 'react';
import './exercise-drawer.less';
import { Button, Drawer } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

type ExerciseDrawerProps = {
    title: string;
    onClose: () => void;
    open: boolean;
    children?: ReactNode;
    closeIcon?: ReactNode;
};

const ExerciseDrawer: FC<ExerciseDrawerProps> = ({ title, open, children, onClose, closeIcon }) => {
    return (
        <Drawer
            title={title}
            destroyOnClose={true}
            placement='right'
            closable={true}
            // zIndex={1001}
            closeIcon={closeIcon}
            open={open}
            className={'exercise-drawer'}
            width={360}
            extra={<Button type='text' size='middle' icon={<CloseOutlined />} onClick={onClose} />}
        >
            {children}
        </Drawer>
    );
};

export default ExerciseDrawer;
