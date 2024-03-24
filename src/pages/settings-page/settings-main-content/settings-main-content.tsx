import Title from 'antd/lib/typography/Title';
import './settings-main-content.less';
import TarifCards from './tarif-cards/tarif-cards';
import { TarifOptions } from './setting-options/setting-options';

const SettingsMainContent = () => {
    return (
        <div className='settings-main-content-wrapper'>
            <Title level={5} className='settings-info-title'>
                Мой тариф
            </Title>
            <TarifCards />
            <TarifOptions />
        </div>
    );
};

export default SettingsMainContent;
