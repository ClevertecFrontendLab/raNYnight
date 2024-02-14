import { Footer as AntdFooter } from 'antd/lib/layout/layout';
import Link from 'antd/lib/typography/Link';

import './footer.less';
import MobileAppCard from './mobile-app-card/mobile-app-card';

const Footer = () => {
    return (
        <AntdFooter className='footer'>
            <Link className='footer-link'>Смотреть отзывы</Link>
            <MobileAppCard />
        </AntdFooter>
    );
};

export default Footer;
