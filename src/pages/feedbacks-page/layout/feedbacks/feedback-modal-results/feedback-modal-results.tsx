import { ResultImages, ResultTitles, ResultMessages } from '@constants/results';
import { Modal, Typography } from 'antd';

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
        bodyStyle: { padding: '64px 86px' },
        width: 539,
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
        okButtonProps: {
            className: 'write-feedback-button-ok feedback-success',
            'data-test-id': 'write-review-not-saved-modal',
        },
        bodyStyle: { padding: '60px 86px' },
        width: 539,
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
        bodyStyle: { padding: '60px 86px' },
        width: 539,
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
