import React, { useEffect } from 'react';
import SidePanel from '@components/side-panel/side-panel';
import { Layout } from 'antd';

import MainFooter from './layout/footer/footer';
import MainHeader from './layout/header/header';
import MainContent from './layout/main-content/main-content';

import './main-page.less';
import { useLazyGetUserInfoQuery } from '@redux/profile/profile-api';
import Loader from '@components/loader/loader';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectUserInfo } from '@redux/profile/profile-slice';

export const MainPage: React.FC = () => {
    const userInfo = useAppSelector(selectUserInfo);
    const [getUserInfo, { isLoading }] = useLazyGetUserInfoQuery();

    useEffect(() => {
        if (userInfo === null) {
            getUserInfo();
        }
    }, [userInfo]);

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
