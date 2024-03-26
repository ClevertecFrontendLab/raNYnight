import SidePanel from '@components/side-panel/side-panel';
import { Layout } from 'antd';

import SettingsHeader from './header/header';
import SettingsMainContent from './settings-main-content/settings-main-content';

export const SettingsPage: React.FC = () => {
    return (
        <Layout className='page-layout'>
            <SidePanel />
            <Layout className='settings-layout'>
                <SettingsHeader />
                <SettingsMainContent />
            </Layout>
        </Layout>
    );
};
