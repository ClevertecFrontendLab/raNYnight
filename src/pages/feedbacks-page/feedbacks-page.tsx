import SidePanel from '@components/side-panel/side-panel';
import { Layout } from 'antd';

import FeedbacksList from './layout/feedbacks/feedbacks';
import FeedbacksFooter from './layout/footer/footer';
import FeedbacksHeader from './layout/header/header';

import { useGetFeedbacksQuery } from '@redux/feedbacks/feedback-api';
import './feedbacks-page.less';
import EmptyFeedbackList from './layout/feedbacks/empty-feedback-list/empty-feedback-list';

export const FeedbacksPage = () => {
    const { data, isLoading } = useGetFeedbacksQuery();
    console.log('getFeedbacks', data);

    return (
        <>
            <Layout className='page-layout'>
                <SidePanel />
                <Layout className='feedbacks-page-layout'>
                    <FeedbacksHeader />
                    {data ? <FeedbacksList data={data} /> : <EmptyFeedbackList />}
                    {data && <FeedbacksFooter />}
                </Layout>
            </Layout>
        </>
    );
};
