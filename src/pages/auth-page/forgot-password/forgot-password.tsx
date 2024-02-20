import { ResultImages, ResultMessages, ResultTitles } from '@constants/results';
import { Typography } from 'antd';
import VerificationInput from 'react-verification-input';
import Loader from '@components/loader/loader';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useConfirmEmailMutation } from '@redux/auth/authApi';
import { selectForgotEmail } from '@redux/auth/authSlice';
import { selectPreviousPath } from '@redux/configure-store';
import { Paths } from '@router/paths';
import { shouldRedirect } from '@router/should-redirect';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './forgot-password.less';

const { Text } = Typography;

const ForgotPassword = () => {
    const forgotEmail = useAppSelector(selectForgotEmail);
    const previousPath = useAppSelector(selectPreviousPath);
    const navigate = useNavigate();
    const [confirmEmail, { isLoading, isError }] = useConfirmEmailMutation();

    const onComplete = async (code: string) => {
        await confirmEmail({ email: forgotEmail, code })
            .unwrap()
            .then(() => navigate(`${Paths.AUTH}/${Paths.CHANGE_PASSWORD}`));
    };

    useEffect(() => {
        if (!previousPath || shouldRedirect(previousPath, Paths.AUTH)) {
            navigate(Paths.AUTH);
        }
    }, []);

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
                />
                <Text className='auth-forgot-message'>{ResultMessages.RESET_CODE_SPAM}</Text>
            </div>
            {isLoading && <Loader />}
        </>
    );
};

export default ForgotPassword;
