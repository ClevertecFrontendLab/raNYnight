import { Layout, Typography } from 'antd';

import { SettingOutlined } from '@ant-design/icons';
import { BREAKPOINT_520, BREAKPOINT_768, BREAKPOINT_834 } from '@constants/breakpoints';
import { useWindowSize } from 'usehooks-ts';

import './header.less';

const { Text, Title } = Typography;
const { Header: AntdHeader } = Layout;

const Header = () => {
    const { width } = useWindowSize();
    return (
        <AntdHeader className='header'>
            <div className='header-left-col'>
                <div className='header-link'>Главная</div>
                <Title level={1} className='header-title'>
                    Приветствуем тебя в CleverFit — приложении,
                    <br />
                    которое поможет тебе добиться своей мечты!
                </Title>
            </div>
            <div className='header-right-col'>
                {width <= BREAKPOINT_834 ? null : <SettingOutlined className='settings-icon' />}
                {width <= BREAKPOINT_768 ? null : <Text className='settings-text'>Настройки</Text>}
                {width < BREAKPOINT_520 ? (
                    <div className='circle'>
                        <SettingOutlined />
                    </div>
                ) : null}
            </div>
        </AntdHeader>
    );
};

export default Header;
