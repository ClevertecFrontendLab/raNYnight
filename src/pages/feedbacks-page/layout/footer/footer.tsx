import { Footer as AntdFooter } from 'antd/lib/layout/layout';
import { Button, Typography } from 'antd';

import './footer.less';

const { Text } = Typography;

const FeedbacksFooter = () => (
    <AntdFooter className='feedbacks-footer'>
        <Button className='feedbacks-footer-button'>Написать отзыв</Button>
        <Text className='feedbacks-footer-link'>Развернуть все отзывы </Text>
        {/* <Link className='footer-link'>Смотреть отзывы</Link> */}
    </AntdFooter>
);

export default FeedbacksFooter;
