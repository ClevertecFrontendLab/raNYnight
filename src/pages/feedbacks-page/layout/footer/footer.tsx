import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import WriteFeedbackButton from '@pages/feedbacks-page/write-feedback-button/write-feedback-button';
import {
    selectIsFeedbackListCollapsed,
    toggleFeedbacksList,
} from '@redux/feedbacks/feedbacks-slice';
import { Typography } from 'antd';
import { Footer as AntdFooter } from 'antd/lib/layout/layout';

import './footer.less';

const { Text } = Typography;

const FeedbacksFooter = () => {
    const dispatch = useAppDispatch();
    const isFeedbackListCollapsed = useAppSelector(selectIsFeedbackListCollapsed);

    return (
        <AntdFooter className='feedbacks-footer'>
            <WriteFeedbackButton />
            <Text
                className='feedbacks-footer-link'
                onClick={() => dispatch(toggleFeedbacksList())}
                data-test-id='all-reviews-button'
            >
                {isFeedbackListCollapsed ? 'Развернуть все отзывы' : 'Свернуть все отзывы'}
            </Text>
        </AntdFooter>
    );
};

export default FeedbacksFooter;
