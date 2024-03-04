import WriteFeedbackButton from '@pages/feedbacks-page/write-feedback-button/write-feedback-button';
import { Typography } from 'antd';

import './empty-feedback-list.less';

const { Text } = Typography;

const EmptyFeedbackList = () => {
    return (
        <div className='empty-feedback-wrapper'>
            <div className='empty-feedback-list'>
                <Text className='empty-feedback-list-title'>Оставьте свой отзыв первым</Text>
                <Text className='empty-feedback-list-text'>
                    Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь
                    своим мнением и опытом с другими пользователями, и помогите им сделать
                    правильный выбор.
                </Text>
            </div>
            <WriteFeedbackButton />
        </div>
    );
};

export default EmptyFeedbackList;
