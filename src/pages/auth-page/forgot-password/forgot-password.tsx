import { ResultImages, ResultMessages } from '@constants/results';
import { Typography } from 'antd';
import VerificationInput from 'react-verification-input';

import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectForgotEmail } from '@redux/auth/authSlice';
import './forgot-password.less';
const { Text } = Typography;

const ForgotPassword = () => {
    const forgotEmail = useAppSelector(selectForgotEmail);

    const onComplete = (value: string) => {
        console.log(value);
    };

    return (
        <div className='auth-forgot-wrapper'>
            <div className='auth-result-image'>{ResultImages.NOTICE}</div>
            <Text className='auth-forgot-title'>
                Введите код <br /> для восстановления аккауанта
            </Text>
            <Text className='auth-forgot-message'>{`Мы отправили вам на e-mail ${forgotEmail} шестизначный код. Введите его в поле ниже.`}</Text>
            <VerificationInput
                validChars='0-9'
                placeholder=''
                classNames={{
                    container: 'verification-input-container',
                    character: 'verification-input-character',
                    characterInactive: 'verification-input-character--inactive',
                    characterSelected: 'verification-input-character--selected',
                    characterFilled: 'verification-input-character--filled',
                }}
                onComplete={onComplete}
            />
            <Text className='auth-forgot-message'>{ResultMessages.RESET_CODE_SPAM}</Text>
        </div>
    );
};

export default ForgotPassword;
