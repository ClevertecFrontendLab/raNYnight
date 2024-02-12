import { Layout } from 'antd';
import React from 'react';
import SidePanel from './layout/side-panel/side-panel';
import './main-page.less';

const { Header, Footer, Content } = Layout;

export const MainPage: React.FC = () => {
    return (
        <>
            <Layout className='main-layout'>
                <SidePanel />
                <Layout>
                    <Header>Header</Header>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        </>
    );
};
