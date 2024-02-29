import { Content } from 'antd/lib/layout/layout';

import MainCards from './main-cards/main-cards';
import MainDescription from './main-description/main-description';
import MainTitle from './main-title/main-title';

import './main-content.less';

const MainContent = () => (
    <Content className='main-content-wrapper'>
        <MainDescription />
        <MainTitle />
        <MainCards />
    </Content>
);

export default MainContent;
