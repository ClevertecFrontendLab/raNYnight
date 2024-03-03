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
const Loader = () => (
    <>
        <div className='loader-mask' />
        <div className='loader-wrapper' data-test-id='loader'>
            <Lottie options={defaultOptions} height={200} width={200} data-test-id='loader' />
        </div>
    </>
);

export default Loader;
