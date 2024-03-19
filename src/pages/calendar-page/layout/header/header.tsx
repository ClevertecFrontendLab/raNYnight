import { Link } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';
import { BREAKPOINT_520, BREAKPOINT_768, BREAKPOINT_834 } from '@constants/breakpoints';
import { Layout, Typography } from 'antd';
import { useWindowSize } from 'usehooks-ts';

import './header.less';

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

export default CalendarHeader;
