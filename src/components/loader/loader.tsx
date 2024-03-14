import Lottie, { Options } from 'react-lottie';

import { default as animationData } from './loader.json';

import './loader.less';

const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
};

interface LoaderProps {
    size?: number;
}
const Loader = ({ size }: LoaderProps) => (
    <div className='loader-container'>
        <div className='loader-mask' />
        <div className='loader-wrapper' data-test-id='loader'>
            <Lottie
                options={defaultOptions}
                height={size ? size : 200}
                width={size ? size : 200}
                data-test-id='loader'
            />
        </div>
    </div>
);

export default Loader;
