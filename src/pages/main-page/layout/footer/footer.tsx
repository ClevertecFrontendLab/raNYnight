import { Footer as AntdFooter } from 'antd/lib/layout/layout';
import Link from 'antd/lib/typography/Link';

import './footer.less';

const Footer = () => {
    return (
        <AntdFooter>
            <Link className='footer-link'>Смотреть отзывы</Link>
        </AntdFooter>
    );
};

export default Footer;
