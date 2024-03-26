import { SettingOutlined } from '@ant-design/icons';
import { BREAKPOINT_520, BREAKPOINT_768, BREAKPOINT_834 } from '@constants/breakpoints';
import { Layout, Typography } from 'antd';
import { useWindowSize } from 'usehooks-ts';

import { Paths } from '@router/paths';
import { Link } from 'react-router-dom';
import './header.less';
import { DATA_TEST_ID } from '@constants/data-test-id';

const { Title } = Typography;
const { Header: AntdHeader } = Layout;

const ProfileHeader = () => {
    const { width } = useWindowSize();
    return (
        <AntdHeader className='profile-header'>
            <Title level={4} style={{ paddingTop: '10px' }}>
                Профиль
            </Title>
            <div className='header-right-col profile-right-col'>
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

export default ProfileHeader;
