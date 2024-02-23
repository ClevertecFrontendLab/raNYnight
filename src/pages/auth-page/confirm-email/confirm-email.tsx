import Loader from '@components/loader/loader';
import { ResultImages, ResultMessages, ResultTitles } from '@constants/results';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useConfirmEmailMutation } from '@redux/auth/authApi';
import { selectForgotEmail, setForgotEmail } from '@redux/auth/authSlice';
import { Paths } from '@router/paths';
import { Typography } from 'antd';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import VerificationInput from 'react-verification-input';
import { useState } from 'react';

import './confirm-email.less';

const { Text } = Typography;

const AuthConfirmEmail = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const prevPath: string = location.state?.prevPath ?? '';
    const normalizedPrevPathname = prevPath.endsWith('/') ? prevPath.slice(0, -1) : prevPath;

    const forgotEmail = useAppSelector(selectForgotEmail);
    const [inputvalue, setInputValue] = useState('');

    const [confirmEmail, { isLoading, isError }] = useConfirmEmailMutation();

    const onComplete = async (code: string) => {
        await confirmEmail({ email: forgotEmail, code })
            .unwrap()
            .then(() => {
                dispatch(setForgotEmail(''));
                navigate(`${Paths.AUTH}/${Paths.CHANGE_PASSWORD}`, {
                    state: { prevPath: location.pathname },
                });
            })
            .catch((err) => console.log('err', err));
        setInputValue('');
    };

    if (!prevPath || normalizedPrevPathname !== Paths.AUTH) {
        return <Navigate to={Paths.AUTH} />;
    }

    return (
        <>
            <div className={`auth-forgot-wrapper ${isLoading ? 'background-filter' : ''}`}>
                <div className='auth-result-image'>
                    {isError ? ResultImages.ERROR : ResultImages.NOTICE}
                </div>
                <Text className='auth-forgot-title'>
                    {isError ? (
                        ResultTitles.ERROR_BAD_CODE
                    ) : (
                        <>
                            Введите код <br /> для восстановления аккауанта
                        </>
                    )}
                </Text>
                <Text className='auth-forgot-message'>
                    Мы отправили вам на e-mail <b>{forgotEmail} </b>шестизначный код. Введите его в
                    поле ниже.
                </Text>
                <VerificationInput
                    value={inputvalue}
                    autoFocus
                    validChars='0-9'
                    placeholder=''
                    classNames={{
                        container: 'verification-input-container',
                        character: `verification-input-character ${
                            isError ? 'verification-error' : ''
                        }`,
                        characterInactive: 'verification-input-character--inactive',
                        characterSelected: 'verification-input-character--selected',
                        characterFilled: 'verification-input-character--filled',
                    }}
                    onComplete={onComplete}
                    onChange={setInputValue}
                    inputProps={{ 'data-test-id': 'verification-input' }}
                />
                <Text className='auth-forgot-message'>{ResultMessages.RESET_CODE_SPAM}</Text>
            </div>
            {isLoading && <Loader />}
        </>
    );
};

export default AuthConfirmEmail;
