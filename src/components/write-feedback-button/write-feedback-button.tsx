import { Button, Modal } from 'antd';
import { useState } from 'react';
import { Input } from 'antd';

import './write-feedback-button.less';
import CustomRate from '@components/custom-rate/custom-rate';
import { useSendFeedbackMutation } from '@redux/feedbacks/feedback-api';

interface WriteFeedbackButtonProps {
    onCLick?: () => void;
}

const { TextArea } = Input;

const WriteFeedbackButton: React.FC<WriteFeedbackButtonProps> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedbackRating, setFeedbackRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');

    const [sendFeedback] = useSendFeedbackMutation();

    const handleFeedbackRatingChange = (newValue: number) => {
        setFeedbackRating(newValue);
    };

    const handleOk = () => {
        sendFeedback({
            rating: feedbackRating,
            message: feedbackText,
        });
    };

    const showModal = () => {
        console.log('click ok');
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button
                className='feedbacks-footer-button empty-feedback-list-button'
                onClick={showModal}
            >
                Написать отзыв
            </Button>
            <Modal
                title='Ваш отзыв'
                open={isModalOpen}
                onOk={handleOk}
                okText='Опубликовать'
                cancelText=''
                centered
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ className: 'write-feedback-button-ok' }}
                width={539}
            >
                <CustomRate disabled={false} onChange={handleFeedbackRatingChange} size={20} />
                <TextArea
                    autoSize
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                />
            </Modal>
        </>
    );
};

export default WriteFeedbackButton;
