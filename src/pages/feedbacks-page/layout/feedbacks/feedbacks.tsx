import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectIsFeedbackListCollapsed } from '@redux/feedbacks/feedbacks-slice';
import { Content } from 'antd/lib/layout/layout';

import FeedbackCard from './feedback-card/feedback-card';

import './feedbacks.less';

interface FeedbacksListProps {
    data:
        | {
              id: string;
              fullname: string | null;
              imageSrc: string | null;
              message: string | null;
              rating: number;
              createdAt: string;
          }[];
}

const FeedbacksList = ({ data }: FeedbacksListProps) => {
    const isFeedbackListCollapsed = useAppSelector(selectIsFeedbackListCollapsed);

    let displayedData = isFeedbackListCollapsed ? data.slice(-4) : data;

    return (
        <Content
            className={`feedbacks-content-wrapper ${isFeedbackListCollapsed ? 'collapsed' : ''}`}
        >
            <div className='feedback-card-list'>
                {displayedData.map((card) => (
                    <FeedbackCard
                        avatar={card.imageSrc}
                        name={card.fullname || 'Анонимный пользователь'}
                        rate={card.rating}
                        date={card.createdAt}
                        feedback={card.message || ''}
                        key={card.id}
                    />
                ))}
            </div>
        </Content>
    );
};

export default FeedbacksList;
