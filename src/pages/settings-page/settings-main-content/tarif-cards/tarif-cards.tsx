import React from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { DATE_DDMM } from '@constants/dates';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import freeTarifPlan from '@public/free-tarif.jpg';
import proTarifPlan from '@public/pro-tarif.jpg';
import { selectUserInfo } from '@redux/profile/profile-slice';
import { setIsTarifDrawerOpen } from '@redux/tariffs/tariffs-slice';
import { Button, Card, Typography } from 'antd';
import dayjs from 'dayjs';

import TariffDrawer from '../tarif-drawer/tariff-drawer';

import './tarif-cards.less';

const tariffsData = {
    free: { title: 'FREE tariff', img: freeTarifPlan, dataTestId: DATA_TEST_ID.freeTariffCard },
    pro: { title: 'PRO tariff', img: proTarifPlan, dataTestId: DATA_TEST_ID.proTariffCard },
};

const TariffCards = () => {
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(selectUserInfo);
    const isProActive = userInfo?.tariff;

    const { free, pro } = tariffsData;

    const handleTariffDrawerOpen = () => {
        dispatch(setIsTarifDrawerOpen(true));
    };

    return (
        <React.Fragment>
            <div className='tariff-cards-wrapper'>
                <Card
                    title={free.title}
                    extra={
                        <Button
                            type='link'
                            onClick={handleTariffDrawerOpen}
                            className='tariff-card-link'
                        >
                            Подробнее
                        </Button>
                    }
                    hoverable={false}
                    data-test-id={free.dataTestId}
                    cover={
                        <div className='tariff-card-cover'>
                            <img alt={free.title} src={free.img} />
                        </div>
                    }
                >
                    <Typography.Text className='tariff-card-status'>
                        активен <CheckOutlined />
                    </Typography.Text>
                </Card>
                <Card
                    title={pro.title}
                    extra={
                        <Button
                            type='link'
                            onClick={handleTariffDrawerOpen}
                            className='tariff-card-link'
                        >
                            Подробнее
                        </Button>
                    }
                    hoverable={false}
                    data-test-id={pro.dataTestId}
                    cover={
                        <div className={`tariff-card-cover ${isProActive ? '' : 'inactive-cover'}`}>
                            <img alt={pro.title} src={pro.img} />
                            <div className='inactive-cover-background' />
                        </div>
                    }
                >
                    {isProActive ? (
                        <Typography.Text>
                            Активирован до {dayjs(userInfo.tariff?.expired).format(DATE_DDMM)}
                        </Typography.Text>
                    ) : (
                        <Button
                            data-test-id='activate-tariff-btn'
                            className='activate-tariff-button'
                            type='primary'
                            onClick={handleTariffDrawerOpen}
                        >
                            Активировать
                        </Button>
                    )}
                </Card>
            </div>
            <TariffDrawer />
        </React.Fragment>
    );
};

export default TariffCards;
