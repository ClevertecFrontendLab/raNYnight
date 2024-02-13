import { Layout } from 'antd';
import React from 'react';
import SidePanel from './layout/side-panel/side-panel';
import Header from './layout/header/header';
import MainContent from './layout/main-content/main-content';
import Footer from './layout/footer/footer';

import './main-page.less';

export const MainPage: React.FC = () => {
    return (
        <>
            <Layout className='page-layout'>
                <SidePanel />
                <Layout>
                    <Header />
                    <MainContent />
                    <Footer />
                </Layout>
            </Layout>
        </>
    );
};
