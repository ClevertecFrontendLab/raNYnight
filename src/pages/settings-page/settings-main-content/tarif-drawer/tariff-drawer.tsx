import React from 'react';
import {
    CheckCircleFilled,
    CheckCircleOutlined,
    CloseCircleOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import { ModalTypes } from '@common-types/modal';
import Loader from '@components/loader/loader';
import { BREAKPOINT_520 } from '@constants/breakpoints';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { DATE_DDMM } from '@constants/dates';
import { DRAWER_WIDTH, DRAWER_WIDTH_MOBILE } from '@constants/sizes';
import { tariffAdvantagesTitles } from '@constants/tariffs';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setActiveModal } from '@redux/modals/modal-manager';
import { selectUserInfo } from '@redux/profile/profile-slice';
import { useCreateTariffMutation } from '@redux/tariffs/tariffs-api';
import {
    selectIsTariffDrawerOpen,
    selectSelectedTariffToBuy,
    setIsTarifDrawerOpen,
    setSelectedTariffToBuy,
} from '@redux/tariffs/tariffs-slice';
import { Button, Drawer, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import dayjs from 'dayjs';
import { useWindowSize } from 'usehooks-ts';

import TariffSelect from './tarif-select/tariff-select';

import './tariff-drawer.less';

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
    const dispatch = useAppDispatch();
    const { width } = useWindowSize();

    const isDesktop = width > BREAKPOINT_520;

    const userInfo = useAppSelector(selectUserInfo);
    const selectedTariff = useAppSelector(selectSelectedTariffToBuy);
    const isTariffDrawerOpen = useAppSelector(selectIsTariffDrawerOpen);

    const [createTariff, { isLoading }] = useCreateTariffMutation();

    const isProActive = userInfo?.tariff;

    const handleCloseDrawer = () => {
        dispatch(setSelectedTariffToBuy(null));
        dispatch(setIsTarifDrawerOpen(false));
    };

    const handleChooseTariff = () => {
        if (selectedTariff) {
            createTariff(selectedTariff)
                .unwrap()
                .then(() => {
                    dispatch(setActiveModal(ModalTypes.tariffNotificationModal));
                    handleCloseDrawer();
                });
        }
    };

    return (
        <React.Fragment>
            <Drawer
                open={isTariffDrawerOpen}
                placement='right'
                width={isDesktop ? DRAWER_WIDTH : DRAWER_WIDTH_MOBILE}
                mask={true}
                maskStyle={{ backgroundColor: 'none' }}
                destroyOnClose={true}
                className='tariff-drawer'
                closeIcon={false}
                title='Сравнить тарифы'
                extra={
                    <Button
                        type='text'
                        size='middle'
                        icon={<CloseOutlined />}
                        onClick={handleCloseDrawer}
                        data-test-id=''
                    />
                }
                footer={
                    !isProActive && (
                        <Button
                            form='form'
                            type='primary'
                            htmlType='submit'
                            className='drawer-submit-button'
                            disabled={selectedTariff === null}
                            data-test-id={DATA_TEST_ID.tariffSubmit}
                            onClick={handleChooseTariff}
                        >
                            Выбрать и оплатить
                        </Button>
                    )
                }
                data-test-id={DATA_TEST_ID.tariffSider}
            >
                {isProActive && (
                    <div className='drawer-pro-tariff-active'>
                        <Title level={5} className='drawer-pro-tariff-active-title'>
                            Ваш PRO tariff активен до{' '}
                            {dayjs(userInfo?.tariff?.expired).format(DATE_DDMM)}
                        </Title>
                    </div>
                )}

                <div className='drawer-tariff-compare-head'>
                    <div className='tariff-title'>FREE</div>
                    <div className='tariff-title'>
                        <Typography.Text className='tariff-title-pro'>PRO </Typography.Text>
                        {isProActive && <CheckCircleOutlined className='tariff-title-checked' />}
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
            {isLoading && <Loader />}
        </React.Fragment>
    );
};

export default TariffDrawer;
