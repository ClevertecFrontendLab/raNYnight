import { Layout, Typography } from 'antd';

import './header.less';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Paths } from '@router/paths';

import './header.less';
import { DATA_TEST_ID } from '@constants/data-test-id';

const { Title } = Typography;
const { Header: AntdHeader } = Layout;
const SettingsHeader = () => {
    return (
        <AntdHeader className='settings-header'>
            <Link
                to={Paths.PROFILE}
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
