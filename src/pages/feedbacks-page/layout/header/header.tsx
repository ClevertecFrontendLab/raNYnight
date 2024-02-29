import { Link } from 'react-router-dom';
import { Layout, Typography } from 'antd';

import './header.less';

const { Text } = Typography;
const { Header: AntdHeader } = Layout;

const FeedbacksHeader = () => {
    return (
        <AntdHeader className='header'>
            <div className='header-left-col'>
                <Link to='/' className='header-link'>
                    Главная / <Text className='header-link-current'>Отзывы пользователей</Text>
                </Link>
            </div>
        </AntdHeader>
    );
};

export default FeedbacksHeader;
