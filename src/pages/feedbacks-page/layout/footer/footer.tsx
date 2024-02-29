import { Footer as AntdFooter } from 'antd/lib/layout/layout';
import Link from 'antd/lib/typography/Link';

import './footer.less';

const FeedbacksFooter = () => (
    <AntdFooter className='footer'>
        <Link className='footer-link'>Смотреть отзывы</Link>
    </AntdFooter>
);

export default FeedbacksFooter;
