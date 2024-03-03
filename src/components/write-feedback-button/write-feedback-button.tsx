import { Button, Input, Modal } from 'antd';
import { useState } from 'react';

import CustomRate from '@components/custom-rate/custom-rate';
import Loader from '@components/loader/loader';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import FeedbackModalResult from '@pages/feedbacks-page/layout/feedbacks/feedback-modal-results/feedback-modal-results';
import { useSendFeedbackMutation } from '@redux/feedbacks/feedback-api';
import { setShouldRefetch } from '@redux/feedbacks/feedbacks-slice';
import './write-feedback-button.less';

const { TextArea } = Input;

const WriteFeedbackButton = () => {
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedbackRating, setFeedbackRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');

    const [sendFeedback, { isLoading }] = useSendFeedbackMutation();

    const handleFeedbackRatingChange = (newValue: number) => {
        setFeedbackRating(newValue);
    };

    const handleOk = () => {
        sendFeedback({
            rating: feedbackRating,
            message: feedbackText,
        })
            .unwrap()
            .then(() => {
                FeedbackModalResult.sendSuccess();
                handleCancel();
                handleFeedbackRatingChange(0);
                setFeedbackText('');
                dispatch(setShouldRefetch(true));
            })
            .catch(() => {
                FeedbackModalResult.sendError(showModal, handleCancel);
                handleCancel();
            });
    };

    const showModal = () => {
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
                data-test-id='write-review'
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
                okButtonProps={{
                    className: 'write-feedback-button-ok',
                    'data-test-id': 'new-review-submit-button',
                }}
                width={539}
            >
                <CustomRate
                    disabled={false}
                    onChange={handleFeedbackRatingChange}
                    size={20}
                    value={feedbackRating}
                />
                <TextArea
                    autoSize
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                />
            </Modal>
            {isLoading && <Loader />}
        </>
    );
};

export default WriteFeedbackButton;
