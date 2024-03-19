import { useNavigate } from 'react-router-dom';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { ResultImages } from '@constants/results';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { ModalTypes, selectModalByType, setCloseModal } from '@redux/modals/modals-slice';
import { Paths } from '@router/paths';
import { Button, Modal } from 'antd';

import './error-modal.less';

export const SomethingWrongModal = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isOpenModal = useAppSelector(selectModalByType(ModalTypes.somethingWrongModal));

    const handleCancel = () => {
        navigate(Paths.MAIN);
        dispatch(setCloseModal(ModalTypes.somethingWrongModal));
    };

    return (
        <Modal
            data-test-id={DATA_TEST_ID.modalNoReview}
            className='something-wrong-modal'
            open={isOpenModal}
            centered={true}
            onCancel={handleCancel}
            footer={null}
            closable={false}
            maskStyle={{ backdropFilter: 'blur(6px)' }}
        >
            <div className='something-wrong-modal-content'>
                {ResultImages.SOMETHING_WRONG}
                <div>
                    <h3 className='something-wrong-modal-title'>Что-то пошло не так</h3>
                    <div className='something-wrong-modal-subtitle'>
                        Произошла ошибка, попробуйте ещё раз.
                    </div>
                </div>
                <Button
                    type='primary'
                    onClick={handleCancel}
                    className='something-wrong-modal-button'
                >
                    Назад
                </Button>
            </div>
        </Modal>
    );
};
