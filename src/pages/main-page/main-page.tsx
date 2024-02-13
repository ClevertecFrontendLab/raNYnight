import { Layout } from 'antd';
import React from 'react';
import SidePanel from './layout/side-panel/side-panel';
import './main-page.less';
import Header from './layout/header/header';
import MainContent from './layout/main-content/main-content';

const { Content } = Layout;

export const MainPage: React.FC = () => {
    return (
        <>
            <Layout className='page-layout'>
                <SidePanel />
                <Layout>
                    <Header />
                    <MainContent />
                </Layout>
            </Layout>
        </>
    );
};
