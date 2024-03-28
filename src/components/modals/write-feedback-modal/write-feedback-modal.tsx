import React, { useState } from 'react';
import { ModalTypes } from '@common-types/modal';
import CustomRate from '@components/custom-rate/custom-rate';
import Loader from '@components/loader/loader';
import FeedbackModalResult from '@components/modals/feedback-modal-results/feedback-modal-results';
import { FEEDBACK_MODAL_WIDTH, RATE_STAR_MODAL } from '@constants/sizes';
import { createOkButtonProps } from '@constants/utils';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useSendFeedbackMutation } from '@redux/feedbacks/feedback-api';
import { setShouldRefetch } from '@redux/feedbacks/feedbacks-slice';
import { selectActiveModal, setActiveModal } from '@redux/modals/modal-manager';
import { Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import './write-feedback-modal.less';

const WriteFeedbackModal = () => {
    const dispatch = useAppDispatch();

    const [feedbackRating, setFeedbackRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');

    const isModalOpen = useAppSelector(selectActiveModal) === ModalTypes.writeFeedbackModal;

    const [sendFeedback, { isLoading }] = useSendFeedbackMutation();

    const handleFeedbackRatingChange = (newValue: number) => {
        setFeedbackRating(newValue);
    };

    const handleCancel = () => dispatch(setActiveModal(ModalTypes.none));

    const showModal = () => dispatch(setActiveModal(ModalTypes.writeFeedbackModal));

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

    return (
        <React.Fragment>
            <Modal
                title='Ваш отзыв'
                open={isModalOpen}
                onOk={handleOk}
                okText='Опубликовать'
                cancelText=''
                centered={true}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={createOkButtonProps(
                    'new-review-submit-button',
                    feedbackRating === 0,
                )}
                width={FEEDBACK_MODAL_WIDTH}
            >
                <CustomRate
                    disabled={false}
                    onChange={handleFeedbackRatingChange}
                    size={RATE_STAR_MODAL}
                    value={feedbackRating}
                />
                <TextArea
                    autoSize={true}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                />
            </Modal>
            {isLoading && <Loader />}
        </React.Fragment>
    );
};

export default WriteFeedbackModal;
