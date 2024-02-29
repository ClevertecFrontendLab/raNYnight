import { Link } from 'react-router-dom';
import { Layout, Typography } from 'antd';

import './header.less';

const { Text } = Typography;
const { Header: AntdHeader } = Layout;

const FeedbacksHeader = () => {
    return (
        <AntdHeader className='feedbacks-header'>
            <Link to='/' className='feedbacks-header-link'>
                Главная &nbsp; / &nbsp;
            </Link>
            <Text className='feedbacks-header-link-current'>Отзывы пользователей</Text>
        </AntdHeader>
    );
};

export default FeedbacksHeader;
