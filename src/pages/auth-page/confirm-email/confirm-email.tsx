import Loader from '@components/loader/loader';
import { ResultImages, ResultMessages, ResultTitles } from '@constants/results';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useConfirmEmailMutation } from '@redux/auth/authApi';
import { selectForgotEmail, setForgotEmail } from '@redux/auth/authSlice';
import { selectPreviousPath } from '@redux/configure-store';
import { Paths } from '@router/paths';
import { Typography } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import VerificationInput from 'react-verification-input';

import { useEffect, useState } from 'react';
import './confirm-email.less';

const { Text } = Typography;

const AuthConfirmEmail = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const forgotEmail = useAppSelector(selectForgotEmail);
    const previousPath = useAppSelector(selectPreviousPath) ?? '';
    const [inputvalue, setInputValue] = useState('');
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const [confirmEmail, { isLoading, isError }] = useConfirmEmailMutation();

    const onComplete = async (code: string) => {
        await confirmEmail({ email: forgotEmail, code })
            .unwrap()
            .then(() => {
                dispatch(setForgotEmail(''));
                navigate(`${Paths.AUTH}/${Paths.CHANGE_PASSWORD}`);
            })
            .catch((err) => console.log('err', err));
        setInputValue('');
    };

    useEffect(() => {
        const normalizedPrevPathname = previousPath.endsWith('/')
            ? previousPath.slice(0, -1)
            : previousPath;
        const allowedPaths = [`${Paths.AUTH}/`, `${Paths.AUTH}`];

        if (!previousPath || !allowedPaths.includes(normalizedPrevPathname)) {
            setShouldRedirect(true);
        }
    }, []);

    if (shouldRedirect) {
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
                <Text className='auth-forgot-message'>{`Мы отправили вам на e-mail ${forgotEmail} шестизначный код. Введите его в поле ниже.`}</Text>
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
