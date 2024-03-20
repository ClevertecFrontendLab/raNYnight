import { SettingOutlined } from '@ant-design/icons';
import { BREAKPOINT_520, BREAKPOINT_768, BREAKPOINT_834 } from '@constants/breakpoints';
import { Layout, Typography } from 'antd';
import { useWindowSize } from 'usehooks-ts';

import './header.less';

const { Text, Title } = Typography;
const { Header: AntdHeader } = Layout;

const ProfileHeader = () => {
    const { width } = useWindowSize();
    return (
        <AntdHeader className='profile-header'>
            <Title level={4} style={{ paddingTop: '10px' }}>
                Профиль
            </Title>
            <div className='header-right-col profile-right-col'>
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

export default ProfileHeader;
