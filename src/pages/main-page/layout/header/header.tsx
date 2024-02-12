import { Layout, Typography } from 'antd';

import './header.less';
import { SettingOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;
const { Header: AntdHeader } = Layout;

const Header = () => {
    return (
        <AntdHeader>
            <div className='header-left-col'>
                <div className='header-link'>Главная</div>
                <Title level={1} className='header-title'>
                    Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                    мечты!
                </Title>
            </div>
            <div className='header-right-col'>
                <SettingOutlined className='settings-icon' />
                <Text>Настройки</Text>
            </div>
        </AntdHeader>
    );
};

export default Header;
