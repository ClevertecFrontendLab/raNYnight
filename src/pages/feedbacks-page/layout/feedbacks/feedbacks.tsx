import { Content } from 'antd/lib/layout/layout';

import './feedbacks.less';
import { Comment } from 'antd';
import FeedbackCard from './feedback-card/feedback-card';

const FeedbacksList = () => (
    <Content className='feedbacks-content-wrapper'>
        <div className='feedback-card-list'>
            <FeedbackCard avatar={''} name={''} rate={0} date={''} feedback={''} />
        </div>
    </Content>
);

export default FeedbacksList;
