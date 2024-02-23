import React from 'react';

import { Layout } from 'antd';

import Footer from './layout/footer/footer';
import Header from './layout/header/header';
import MainContent from './layout/main-content/main-content';
import SidePanel from './layout/side-panel/side-panel';

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
