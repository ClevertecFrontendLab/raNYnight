export const baseQuery = 'https://marathon-api.clevertec.ru/';

export enum ApiEndpoints {
    Login = 'auth/login',
    Register = 'auth/registration',
    CheckEmail = 'auth/check-email',
    ConfirmEmail = 'auth/confirm-email',
    ChangePassword = 'auth/change-password',
    Google = 'auth/google',
    Feedback = 'feedback',
    TrainingList = 'catalogs/training-list',
    TariffList = 'catalogs/tariff-list',
    Training = 'training',
    User = 'user',
    UserMe = 'user/me',
    Tariff = 'tariff',
    TariffCheckout = 'tariff/checkout',
}

export const authGoogleQuery = `${baseQuery}${ApiEndpoints.Google}`;
