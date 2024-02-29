import { Link } from 'react-router-dom';
import { Paths } from '@router/paths';
import { Footer as AntdFooter } from 'antd/lib/layout/layout';

import MobileAppCard from './mobile-app-card/mobile-app-card';

import './footer.less';

const MainFooter = () => (
    <AntdFooter className='footer'>
        <Link to={Paths.FEEDBACKS} className='footer-link'>
            Смотреть отзывы
        </Link>
        <MobileAppCard />
    </AntdFooter>
);

export default MainFooter;
