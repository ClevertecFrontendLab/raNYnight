import { Layout, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useWindowSize } from 'usehooks-ts';

import './header.less';

const { Text, Title } = Typography;
const { Header: AntdHeader } = Layout;

const Header = () => {
    const { width } = useWindowSize();
    return (
        <AntdHeader>
            <div className='header-left-col'>
                <div className='header-link'>Главная</div>
                <Title level={1} className='header-title'>
                    Приветствуем тебя в CleverFit — приложении,
                    <br />
                    которое поможет тебе добиться своей мечты!
                </Title>
            </div>
            <div className='header-right-col'>
                {width < 835 ? null : <SettingOutlined className='settings-icon' />}
                {width < 769 ? null : <Text className='settings-text'>Настройки</Text>}
                {width < 520 ? (
                    <div className='circle'>
                        <SettingOutlined />
                    </div>
                ) : null}
            </div>
        </AntdHeader>
    );
};

export default Header;
