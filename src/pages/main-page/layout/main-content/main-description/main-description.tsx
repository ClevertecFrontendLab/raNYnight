import Paragraph from 'antd/lib/typography/Paragraph';

import './main-description.less';

const MainDescription = () => {
    return (
        <Paragraph className='main-content-description'>
            С CleverFit ты сможешь:
            <br />
            — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;
            <br />
            — отслеживать свои достижения в разделе статистики, сравнивая свои результаты с нормами
            и рекордами;
            <br />
            — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы
            о тренировках;
            <br />— выполнять расписанные тренировки для разных частей тела, следуя подробным
            инструкциям и советам профессиональных тренеров.
        </Paragraph>
    );
};

export default MainDescription;
