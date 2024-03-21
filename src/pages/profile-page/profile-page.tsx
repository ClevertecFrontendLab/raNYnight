import SidePanel from '@components/side-panel/side-panel';
import { Layout } from 'antd';

import ProfileHeader from './header/header';
import ProfileMainContent from './main-content/profile-main-content';

export const ProfilePage: React.FC = () => {
    return (
        <Layout className='page-layout'>
            <SidePanel />
            <Layout className='profile-layout'>
                <ProfileHeader />
                <ProfileMainContent />
            </Layout>
        </Layout>
    );
};
