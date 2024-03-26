import { Link } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';
import { BREAKPOINT_520, BREAKPOINT_768, BREAKPOINT_834 } from '@constants/breakpoints';
import { Layout, Typography } from 'antd';
import { useWindowSize } from 'usehooks-ts';

import './header.less';
import { Paths } from '@router/paths';
import { DATA_TEST_ID } from '@constants/data-test-id';

const { Text } = Typography;
const { Header: AntdHeader } = Layout;

const CalendarHeader = () => {
    const { width } = useWindowSize();
    return (
        <AntdHeader className='calendar-header'>
            <div className='calendar-header-link-wrapper'>
                <Link to='/' className='calendar-header-link'>
                    Главная &nbsp; / &nbsp;
                </Link>
                <Text className='calendar-header-link-current'>Календарь</Text>
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
                        state={{ prevPath: location.pathname }}
                        className='settings-text'
                        data-test-id={DATA_TEST_ID.headerSettings}
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

export default CalendarHeader;
