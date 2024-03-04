import { ButtonProps } from 'antd';

export type OkButtonProps = ButtonProps & {
    'data-test-id': string;
};

export const createOkButtonProps = (dataTestId: string): OkButtonProps => {
    return {
        className: 'write-feedback-button-ok',
        'data-test-id': dataTestId,
    };
};
