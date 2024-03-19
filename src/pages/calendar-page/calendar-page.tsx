import SidePanel from '@components/side-panel/side-panel';
import { Layout } from 'antd';
import { Footer } from 'antd/lib/layout/layout';

import AppCalendar from './layout/app-calendar/calendar';
import CalendarHeader from './layout/header/header';

import './calendar-page.less';

export const CalendarPage: React.FC = () => {
    return (
        <Layout className='page-layout'>
            <SidePanel />
            <Layout className='calendar-layout'>
                <CalendarHeader />
                <AppCalendar />
                <Footer className='calendar-footer' />
            </Layout>
        </Layout>
    );
};
