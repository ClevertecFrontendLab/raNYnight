import { ModalTypes } from '@common-types/modal';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setActiveModal } from '@redux/modals/modal-manager';
import { Button } from 'antd';

import './write-feedback-button.less';

const WriteFeedbackButton = () => {
    const dispatch = useAppDispatch();

    const showModal = () => {
        dispatch(setActiveModal(ModalTypes.writeFeedbackModal));
    };

    return (
        <Button
            className='feedbacks-footer-button empty-feedback-list-button'
            onClick={showModal}
            data-test-id={DATA_TEST_ID.writeReview}
        >
            Написать отзыв
        </Button>
    );
};

export default WriteFeedbackButton;
