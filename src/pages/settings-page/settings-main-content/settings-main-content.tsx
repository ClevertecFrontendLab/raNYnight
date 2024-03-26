import Title from 'antd/lib/typography/Title';
import './settings-main-content.less';
import TariffCards from './tarif-cards/tarif-cards';
import { TariffOptions } from './setting-options/setting-options';
import WriteFeedbackButton from '@pages/feedbacks-page/write-feedback-button/write-feedback-button';
import { Link } from 'react-router-dom';
import { Paths } from '@router/paths';
import { Button } from 'antd';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useLazyGetTariffListQuery } from '@redux/tariffs/tariffs-api';
import { selectTariffList } from '@redux/tariffs/tariffs-slice';
import { useEffect } from 'react';

const SettingsMainContent = () => {
    const [getTariffList] = useLazyGetTariffListQuery();

    const tariffList = useAppSelector(selectTariffList);
    useEffect(() => {
        if (!tariffList.length) {
            getTariffList();
        }
    }, [getTariffList, tariffList.length]);

    return (
        <div className='settings-main-content-wrapper'>
            <Title level={5} className='settings-info-title'>
                Мой тариф
            </Title>
            <TariffCards />
            <TariffOptions />
            <div className='write-feedback-wrapper'>
                <WriteFeedbackButton />
                <Link to={Paths.FEEDBACKS}>
                    <Button type='link'>Смотреть все отзывы</Button>
                </Link>
            </div>
        </div>
    );
};

export default SettingsMainContent;
