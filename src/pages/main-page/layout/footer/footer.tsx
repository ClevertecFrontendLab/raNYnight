import { Link } from 'react-router-dom';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { Paths } from '@router/paths';
import { Footer as AntdFooter } from 'antd/lib/layout/layout';

import MobileAppCard from './mobile-app-card/mobile-app-card';

import './footer.less';

const MainFooter = () => (
    <AntdFooter className='footer'>
        <Link to={Paths.FEEDBACKS} className='footer-link' data-test-id={DATA_TEST_ID.seeReviews}>
            Смотреть отзывы
        </Link>
        <MobileAppCard />
    </AntdFooter>
);

export default MainFooter;
