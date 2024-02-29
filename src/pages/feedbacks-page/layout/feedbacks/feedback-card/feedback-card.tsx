import { Rate, Typography } from 'antd';

import './feedback-card.less';

const { Text } = Typography;

interface FeedbackCardProps {
    avatar: string;
    name: string;
    rate: number;
    date: string;
    feedback: string;
}

const FeedbackCard = ({ avatar, name, rate, date, feedback }: FeedbackCardProps) => (
    <div className='feedback-card'>
        <div className='feedback-user'>
            <div className='user-avatart'>
                <img src={avatar} />
            </div>
            <div className='user-name'>{name}</div>
        </div>
        <div className='feedback-data'>
            <Rate value={rate} />
            <Text>{date}</Text>
            <Text>{feedback}</Text>
        </div>
    </div>
);

export default FeedbackCard;
