import Title from 'antd/lib/typography/Title';

import './main-title.less';

const MainTitle = () => {
    return (
        <Title level={4} className='main-content-title'>
            CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса.
            Не откладывай на завтра — начни тренироваться уже сегодня!
        </Title>
    );
};

export default MainTitle;
