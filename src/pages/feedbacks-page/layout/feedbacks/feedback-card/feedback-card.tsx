import { UserOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

import CustomRate from '@components/custom-rate/custom-rate';
import './feedback-card.less';

const { Text } = Typography;

interface FeedbackCardProps {
    avatar: string | null;
    name: string;
    rate: number;
    date: string;
    feedback: string;
}

const FeedbackCard = ({ avatar, name, rate, date, feedback }: FeedbackCardProps) => {
    const [firstName, lastName] = name.split(' ');
    const feedbackDate = new Date(date);
    const formattedDate = feedbackDate.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <div className='feedback-card'>
            <div className='feedback-user'>
                {avatar ? (
                    <img src={avatar} className='user-avatar' />
                ) : (
                    <UserOutlined className='user-avatar' />
                )}

                <Text className='user-name'>
                    {firstName}
                    <br />
                    {lastName}
                </Text>
            </div>
            <div className='feedback-data'>
                <CustomRate rate={rate} disabled={true} size={13} />
                <Text className='feedback-date'>{formattedDate}</Text>
                <Text className='feedback-text'>{feedback}</Text>
            </div>
        </div>
    );
};

export default FeedbackCard;
