import { SettingOutlined } from '@ant-design/icons';
import { BREAKPOINT_520, BREAKPOINT_768, BREAKPOINT_834 } from '@constants/breakpoints';
import { Layout, Typography } from 'antd';
import { useWindowSize } from 'usehooks-ts';

import './header.less';
import { Link } from 'react-router-dom';
import { Paths } from '@router/paths';

const { Title } = Typography;
const { Header: AntdHeader } = Layout;

const MainHeader = () => {
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
                {width <= BREAKPOINT_834 ? null : (
                    <Link to={Paths.SETTINGS}>
                        <SettingOutlined className='settings-icon' />
                    </Link>
                )}
                {width <= BREAKPOINT_768 ? null : (
                    <Link to={Paths.SETTINGS} className='settings-text '>
                        Настройки
                    </Link>
                )}
                {width < BREAKPOINT_520 ? (
                    <Link to={Paths.SETTINGS} className='circle'>
                        <SettingOutlined />
                    </Link>
                ) : null}
            </div>
        </AntdHeader>
    );
};

export default MainHeader;
