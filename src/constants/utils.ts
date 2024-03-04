import { ButtonProps } from 'antd';

export type OkButtonProps = ButtonProps & {
    'data-test-id': string;
};

export const okButtonProps: OkButtonProps = {
    className: 'write-feedback-button-ok',
    'data-test-id': 'new-review-submit-button',
};
