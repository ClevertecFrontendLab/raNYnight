import { Link, useLocation } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';
import { BREAKPOINT_520, BREAKPOINT_768, BREAKPOINT_834 } from '@constants/breakpoints';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { Paths } from '@router/paths';
import { Layout, Typography } from 'antd';
import { useWindowSize } from 'usehooks-ts';

import './header.less';

const { Title } = Typography;
const { Header: AntdHeader } = Layout;

const MainHeader = () => {
    const { width } = useWindowSize();
    const location = useLocation();

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
                    <Link to={Paths.SETTINGS} state={{ prevPath: location.pathname }}>
                        <SettingOutlined className='settings-icon' />
                    </Link>
                )}
                {width <= BREAKPOINT_768 ? null : (
                    <Link
                        to={Paths.SETTINGS}
                        className='settings-text'
                        data-test-id={DATA_TEST_ID.headerSettings}
                        state={{ prevPath: location.pathname }}
                    >
                        Настройки
                    </Link>
                )}
                {width < BREAKPOINT_520 ? (
                    <Link
                        to={Paths.SETTINGS}
                        className='circle'
                        state={{ prevPath: location.pathname }}
                    >
                        <SettingOutlined />
                    </Link>
                ) : null}
            </div>
        </AntdHeader>
    );
};

export default MainHeader;
