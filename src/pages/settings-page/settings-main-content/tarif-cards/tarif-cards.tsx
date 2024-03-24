import { Button, Card, Typography } from 'antd';
import './tarif-cards.less';

import { DATA_TEST_ID } from '@constants/data-test-id';
import freeTarifPlan from '@public/free-tarif.jpg';
import proTarifPlan from '@public/pro-tarif.jpg';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectUserInfo } from '@redux/profile/profile-slice';
import { CheckOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { DATE_MMDD } from '@constants/dates';
import TariffDrawer from '../tarif-drawer/tariff-drawer';

const tariffsData = {
    free: { title: 'FREE tariff', img: freeTarifPlan, dataTestId: DATA_TEST_ID.freeTariffCard },
    pro: { title: 'PRO tariff', img: proTarifPlan, dataTestId: DATA_TEST_ID.proTariffCard },
};

const TariffCards = () => {
    const userInfo = useAppSelector(selectUserInfo);
    const isProActive = userInfo?.tariff;

    const { free, pro } = tariffsData;

    const handleTariffDrawerOpen = () => {
        console.log('handleTariffDrawerOpen');
    };

    return (
        <>
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
                            <div className='inactive-cover-background'></div>
                        </div>
                    }
                >
                    {isProActive ? (
                        <Typography.Text>
                            Активирован до {dayjs(userInfo.tariff?.expired).format(DATE_MMDD)}
                        </Typography.Text>
                    ) : (
                        <Button
                            data-test-id='activate-tariff-btn'
                            className='activate-tarif-button'
                            type='primary'
                            onClick={handleTariffDrawerOpen}
                        >
                            Активировать
                        </Button>
                    )}
                </Card>
            </div>
            <TariffDrawer />
        </>
    );
};

export default TariffCards;
