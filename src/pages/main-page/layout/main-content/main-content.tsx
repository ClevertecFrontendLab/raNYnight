import { Content } from 'antd/lib/layout/layout';
import MainDescription from './main-description/main-description';
import MainTitle from './main-title/main-title';
import MainCards from './main-cards/main-cards';

import './main-content.less';

const MainContent = () => (
    <Content className='main-content-wrapper'>
        <MainDescription />
        <MainTitle />
        <MainCards />
    </Content>
);

export default MainContent;
