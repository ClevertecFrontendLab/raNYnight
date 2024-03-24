import {
    CheckCircleFilled,
    CheckCircleOutlined,
    CloseCircleOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import { BREAKPOINT_520 } from '@constants/breakpoints';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { DRAWER_WIDTH, DRAWER_WIDTH_MOBILE } from '@constants/sizes';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectUserInfo } from '@redux/profile/profile-slice';
import { Button, Drawer } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useWindowSize } from 'usehooks-ts';
import dayjs from 'dayjs';
import { DATE_MMDD } from '@constants/dates';

import './tariff-drawer.less';
import { tariffAdvantagesTitles } from '@constants/tariffs';
import TariffSelect from './tarif-select/tariff-select';

const { monthStat, allTimeStat, partytrainings, maraphons, iosApp, androidApp, chatGPT } =
    tariffAdvantagesTitles;

const tariffAdvantagesData = [
    {
        title: monthStat,
        isFree: true,
    },
    {
        title: allTimeStat,
        isFree: false,
    },
    {
        title: partytrainings,
        isFree: true,
    },
    {
        title: maraphons,
        isFree: false,
    },
    {
        title: iosApp,
        isFree: false,
    },
    {
        title: androidApp,
        isFree: false,
    },
    {
        title: chatGPT,
        isFree: false,
    },
];

const TariffDrawer = () => {
    const { width } = useWindowSize();
    const userInfo = useAppSelector(selectUserInfo);

    const isProActive = userInfo?.tariff;

    const handleCloseDrawer = () => {};

    return (
        <Drawer
            open={true}
            placement='right'
            width={width > BREAKPOINT_520 ? DRAWER_WIDTH : DRAWER_WIDTH_MOBILE}
            mask={true}
            maskStyle={{ backgroundColor: 'none' }}
            className='tariff-drawer'
            closeIcon={false}
            title='Сравнить тарифы'
            extra={
                <Button
                    type='text'
                    size='middle'
                    icon={<CloseOutlined />}
                    onClick={handleCloseDrawer}
                    data-test-id={''}
                />
            }
            footer={
                !isProActive && (
                    <Button
                        form='form'
                        type='primary'
                        htmlType='submit'
                        className='drawer-submit-button'
                        disabled={false}
                        data-test-id={DATA_TEST_ID.tariffSubmit}
                    >
                        Выбрать и оплатить
                    </Button>
                )
            }
            data-test-id={DATA_TEST_ID.tariffSider}
        >
            {!isProActive && (
                <div className='drawer-pro-tariff-active'>
                    <Title level={5}>
                        Ваш PRO tariff активен до{' '}
                        {dayjs(userInfo?.tariff?.expired).format(DATE_MMDD)}
                    </Title>
                </div>
            )}

            <div className='drawer-tariff-compare-head'>
                <div className='tariff-title'>FREE</div>
                <div className='tariff-title'>
                    PRO {!isProActive && <CheckCircleOutlined className='tariff-title-checked' />}
                </div>
            </div>

            <div className='drawer-tariff-features'>
                {tariffAdvantagesData.map(({ title, isFree }) => (
                    <div key={title} className='tariff-feature'>
                        <div className='tariff-feature-title'>{title}</div>
                        {isFree ? (
                            <CheckCircleFilled />
                        ) : (
                            <CloseCircleOutlined className='tariff-feature-disabled' />
                        )}
                        <CheckCircleFilled className='tariff-feature-second' />
                    </div>
                ))}
            </div>

            <TariffSelect isProActive={!!isProActive} />
        </Drawer>
    );
};

export default TariffDrawer;
