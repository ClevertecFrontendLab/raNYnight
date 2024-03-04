import { ResultImages, ResultMessages, ResultTitles } from '@constants/results';
import { FEEDBACK_MODAL_WIDTH } from '@constants/sizes';
import { okButtonProps } from '@constants/utils';
import { Modal, Typography } from 'antd';

import './feedback-modal-result.less';

const { Text } = Typography;

const showSendSuccessModal = () => {
    Modal.confirm({
        className: 'write-feedback-modal-result',
        icon: ResultImages.SUCCESS,
        content: 'Отзыв успешно опубликован',
        okText: 'Отлично',
        centered: true,
        cancelButtonProps: { style: { display: 'none' } },
        okButtonProps: { className: 'write-feedback-button-ok feedback-success' },
        width: FEEDBACK_MODAL_WIDTH,
    });
};

const showSendErrorModal = (showModal: () => void, handleCancel: () => void) => {
    Modal.confirm({
        className: 'write-feedback-modal-result feedback-error-modal',
        icon: ResultImages.ERROR,
        content: (
            <>
                <Text className='auth-result-title'>{ResultTitles.ERROR_DATA_NOT_SAVED}</Text>
                <Text className='auth-result-message'>{ResultMessages.ERROR_SOMETHING_WRONG}</Text>
            </>
        ),
        okText: 'Написать отзыв',
        cancelText: 'Закрыть',
        centered: true,
        cancelButtonProps: { className: 'write-feedback-button-ok feedback-error' },
        okButtonProps: okButtonProps,
        width: FEEDBACK_MODAL_WIDTH,
        closable: false,
        onOk: showModal,
        onCancel: handleCancel,
    });
};

const showGetErrorModal = (handleCancel?: () => void) => {
    console.log('error modal');
    Modal.confirm({
        className: 'write-feedback-modal-result feedback-error-modal',
        icon: ResultImages.SOMETHING_WRONG,
        content: (
            <>
                <Text className='auth-result-title'>{ResultTitles.ERROR_SOMETHING_WRONG}</Text>
                <Text className='auth-result-message'>{ResultMessages.ERROR_SOMETHING_WRONG}</Text>
            </>
        ),
        okText: 'Назад',
        centered: true,
        cancelButtonProps: { style: { display: 'none' } },
        okButtonProps: {
            className: 'write-feedback-button-ok feedback-success',
            style: { width: 'fit-content', margin: '0 auto' },
        },
        width: FEEDBACK_MODAL_WIDTH,
        closable: false,
        okCancel: true,
        onOk: handleCancel,
    });
};

const FeedbackModalResult = {
    sendSuccess: showSendSuccessModal,
    sendError: showSendErrorModal,
    getError: showGetErrorModal,
};

export default FeedbackModalResult;
