import React, { useEffect } from 'react';
import Loader from '@components/loader/loader';
import SidePanel from '@components/side-panel/side-panel';
import { useLazyGetUserInfoQuery } from '@redux/profile/profile-api';
import { Layout } from 'antd';

import MainFooter from './layout/footer/footer';
import MainHeader from './layout/header/header';
import MainContent from './layout/main-content/main-content';

import './main-page.less';

export const MainPage: React.FC = () => {
    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');

    const [getUserInfo, { data, isLoading }] = useLazyGetUserInfoQuery();

    useEffect(() => {
        if (!data && token) {
            getUserInfo();
        }
    });

    return (
        <Layout className='page-layout'>
            <SidePanel />
            <Layout>
                <MainHeader />
                <MainContent />
                <MainFooter />
            </Layout>
            {isLoading && <Loader />}
        </Layout>
    );
};
