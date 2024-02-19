import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import './auth-result.less';

const { Text } = Typography;

interface AuthResultProps {
    title: string;
    message: string;
    action: string;
    image: JSX.Element | null;
    href: string;
}

const AuthResult = ({ title, message, action, image, href }: AuthResultProps) => {
    return (
        <div className='auth-result-wrapper'>
            <div className='auth-result-image'>{image}</div>
            <Text className='auth-result-title'>{title}</Text>
            <Text className='auth-result-message'>{message}</Text>
            <Button type='primary' htmlType='submit' className='auth-result-button'>
                <Link to={`/auth/${href}`}>{action}</Link>
            </Button>
        </div>
    );
};

export default AuthResult;
