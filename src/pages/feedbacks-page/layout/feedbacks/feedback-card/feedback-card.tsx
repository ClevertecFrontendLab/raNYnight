import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { Rate, Typography } from 'antd';

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
                <Rate
                    disabled
                    defaultValue={rate}
                    className='feedback-rate'
                    character={({ value, index }) => {
                        return value && index! < value ? <StarFilled /> : <StarOutlined />;
                    }}
                />
                <Text className='feedback-date'>{date}</Text>
                <Text className='feedback-text'>{feedback}</Text>
            </div>
        </div>
    );
};

export default FeedbackCard;
