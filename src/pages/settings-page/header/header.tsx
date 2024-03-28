import { Link, useLocation } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { Paths } from '@router/paths';
import { Layout, Typography } from 'antd';

import './header.less';

const { Title } = Typography;
const { Header: AntdHeader } = Layout;
const SettingsHeader = () => {
    const location = useLocation();

    return (
        <AntdHeader className='settings-header'>
            <Link
                to={location.state.prevPath ?? Paths.MAIN}
                className='setting-back-button'
                data-test-id={DATA_TEST_ID.settingsBack}
            >
                <ArrowLeftOutlined />
            </Link>
            <Title level={4} style={{ paddingTop: '7px' }}>
                Настройки
            </Title>
        </AntdHeader>
    );
};

export default SettingsHeader;
