import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    selectIsFeedbackListCollapsed,
    toggleFeedbacksList,
} from '@redux/feedbacks/feedbacks-slice';
import { Button, Typography } from 'antd';
import { Footer as AntdFooter } from 'antd/lib/layout/layout';

import './footer.less';

const { Text } = Typography;

const FeedbacksFooter = () => {
    const dispatch = useAppDispatch();
    const isFeedbackListCollapsed = useAppSelector(selectIsFeedbackListCollapsed);

    return (
        <AntdFooter className='feedbacks-footer'>
            <Button className='feedbacks-footer-button'>Написать отзыв</Button>
            <Text className='feedbacks-footer-link' onClick={() => dispatch(toggleFeedbacksList())}>
                {isFeedbackListCollapsed ? 'Развернуть все отзывы' : 'Свернуть отзывы'}
            </Text>
        </AntdFooter>
    );
};

export default FeedbacksFooter;
