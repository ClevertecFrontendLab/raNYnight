import React from 'react';
import SidePanel from '@components/side-panel/side-panel';
import { Layout } from 'antd';

import MainFooter from './layout/footer/footer';
import MainHeader from './layout/header/header';
import MainContent from './layout/main-content/main-content';

import './main-page.less';

export const MainPage: React.FC = () => {
    return (
        <>
            <Layout className='page-layout'>
                <SidePanel />
                <Layout>
                    <MainHeader />
                    <MainContent />
                    <MainFooter />
                </Layout>
            </Layout>
        </>
    );
};
