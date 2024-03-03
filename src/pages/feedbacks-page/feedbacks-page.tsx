import SidePanel from '@components/side-panel/side-panel';
import { Layout } from 'antd';

import FeedbacksList from './layout/feedbacks/feedbacks';
import FeedbacksFooter from './layout/footer/footer';
import FeedbacksHeader from './layout/header/header';

import { useGetFeedbacksQuery } from '@redux/feedbacks/feedback-api';
import './feedbacks-page.less';
import EmptyFeedbackList from './layout/feedbacks/empty-feedback-list/empty-feedback-list';
import Loader from '@components/loader/loader';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectShouldRefetch } from '@redux/feedbacks/feedbacks-slice';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Paths } from '@router/paths';
import { setAuthToken } from '@redux/auth/auth-slice';
import FeedbackModalResult from './layout/feedbacks/feedback-modal-results/feedback-modal-results';

export const FeedbacksPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [errorModalShown, setErrorModalShown] = useState(false);
    const shouldRefetch = useAppSelector(selectShouldRefetch);

    const { data, isLoading, refetch, error } = useGetFeedbacksQuery();

    useEffect(() => {
        if (shouldRefetch) {
            refetch();
        }

        if (error && 'status' in error) {
            if (error.status === 403) {
                dispatch(setAuthToken(null));
                navigate(Paths.AUTH);
            } else if (!errorModalShown) {
                setErrorModalShown(true);
                FeedbackModalResult.getError(handleCancel);
            }
        }
    }, [shouldRefetch, refetch, error, dispatch, navigate, errorModalShown]);

    const handleCancel = () => {
        navigate(Paths.MAIN);
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <Layout className='page-layout'>
                <SidePanel />
                <Layout className='feedbacks-page-layout'>
                    <FeedbacksHeader />
                    {data && data.length > 0 ? (
                        <FeedbacksList data={data} />
                    ) : (
                        <EmptyFeedbackList />
                    )}
                    {/* <EmptyFeedbackList /> */}
                    {data && data.length > 0 && <FeedbacksFooter />}
                </Layout>
            </Layout>
        </>
    );
};
