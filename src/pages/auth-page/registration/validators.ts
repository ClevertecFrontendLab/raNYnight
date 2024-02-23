import { RuleObject } from 'antd/lib/form';

export const validatePassword = async (_: RuleObject, value: string) => {
    const passRegExp = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return RegExp(passRegExp).test(value)
        ? Promise.resolve()
        : Promise.reject(new Error('Пароль не менее 8 символов, с заглавной буквой и цифрой'));
};

// export const validateRepeatPassword = async (_: RuleObject, value: string) => {
//     if (!value || getFieldValue('password') === value) {
//         return Promise.resolve();
//     }
//     return Promise.reject(new Error('Пароли не совпадают'));
// }

export const validateRepeatPassword = ({
    getFieldValue,
}: {
    getFieldValue: (field: string) => string | undefined;
}) => ({
    validator(_: RuleObject, value: string) {
        if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Пароли не совпадают'));
    },
});
