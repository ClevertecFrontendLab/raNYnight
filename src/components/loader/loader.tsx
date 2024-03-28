import { createPortal } from 'react-dom';
import Lottie, { Options } from 'react-lottie';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { LOADER_DEFAULT_WIDTH } from '@constants/sizes';

// eslint-disable-next-line import/no-named-default
import { default as animationData } from './loader.json';

import './loader.less';

const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
};

interface LoaderProps {
    size?: number;
}
const Loader = ({ size }: LoaderProps) => {
    const loaderRoot = document.body;
    const loader = (
        <div className='loader-container'>
            <div className='loader-mask' />
            <div className='loader-wrapper' data-test-id={DATA_TEST_ID.loader}>
                <Lottie
                    options={defaultOptions}
                    height={size || LOADER_DEFAULT_WIDTH}
                    width={size || LOADER_DEFAULT_WIDTH}
                    data-test-id={DATA_TEST_ID.loader}
                />
            </div>
        </div>
    );

    return createPortal(loader, loaderRoot);
};

export default Loader;
