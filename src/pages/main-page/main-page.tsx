import React, { useLayoutEffect } from 'react';
import { UserData } from '@common-types/profile';
import SidePanel from '@components/side-panel/side-panel';
import { ApiEndpoints, baseQuery } from '@constants/api';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectAuthToken } from '@redux/auth/auth-slice';
import { selectUserInfo, setUserInfo } from '@redux/profile/profile-slice';
import { Layout } from 'antd';

import MainFooter from './layout/footer/footer';
import MainHeader from './layout/header/header';
import MainContent from './layout/main-content/main-content';

import './main-page.less';

export const MainPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(selectUserInfo);
    const authToken = useAppSelector(selectAuthToken);

    const getUserInfo = async () => {
        try {
            const response = await fetch(`${baseQuery}${ApiEndpoints.UserMe}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (response.ok) {
                const data: UserData = await response.json();

                dispatch(setUserInfo(data));
            } else {
                dispatch(setUserInfo(null));
            }
        } catch (error) {
            dispatch(setUserInfo(null));
        }
    };

    // const [getUserInfo, { isLoading }] = useLazyGetUserInfoQuery(); //w8 for solution

    useLayoutEffect(() => {
        if (!userInfo?.email && authToken) {
            getUserInfo();
        }
    }, [userInfo, userInfo?.email]);

    return (
        <Layout className='page-layout'>
            <SidePanel />
            <Layout>
                <MainHeader />
                <MainContent />
                <MainFooter />
            </Layout>
        </Layout>
    );
};
