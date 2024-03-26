import React, { useEffect } from 'react';
import Loader from '@components/loader/loader';
import SidePanel from '@components/side-panel/side-panel';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useLazyGetUserInfoQuery } from '@redux/profile/profile-api';
import { selectUserInfo } from '@redux/profile/profile-slice';
import { Layout } from 'antd';

import MainFooter from './layout/footer/footer';
import MainHeader from './layout/header/header';
import MainContent from './layout/main-content/main-content';

import './main-page.less';

export const MainPage: React.FC = () => {
    const userInfo = useAppSelector(selectUserInfo);
    const [getUserInfo, { isLoading }] = useLazyGetUserInfoQuery();

    useEffect(() => {
        if (!userInfo?.email) {
            getUserInfo();
        }
    }, [userInfo, userInfo?.email]);

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
            {isLoading && <Loader />}
        </>
    );
};
