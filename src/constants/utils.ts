import { ButtonProps } from 'antd';

export type OkButtonProps = ButtonProps & {
    'data-test-id': string;
};

export const createOkButtonProps = (dataTestId: string, disabled = false): OkButtonProps => ({
        className: 'write-feedback-button-ok',
        'data-test-id': dataTestId,
        disabled,
    });
