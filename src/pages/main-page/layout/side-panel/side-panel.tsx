import { Image } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import headerLogo from '/cleverfit.svg';
import tsLogo from '/ts.svg';

const SidePanel = () => {
    return (
        <Sider style={{ background: '#fff' }}>
            <Image src={headerLogo} />
        </Sider>
    );
};

export default SidePanel;
