import SidePanel from '@components/side-panel/side-panel';
import { Layout } from 'antd';

import FeedbacksList from './layout/feedbacks/feedbacks';
import FeedbacksFooter from './layout/footer/footer';
import FeedbacksHeader from './layout/header/header';

import './feedbacks-page.less';

export const FeedbacksPage = () => {
    return (
        <>
            <Layout className='page-layout'>
                <SidePanel />
                <Layout className='feedbacks-page-layout'>
                    <FeedbacksHeader />
                    <FeedbacksList />
                    <FeedbacksFooter />
                </Layout>
            </Layout>
        </>
    );
};
