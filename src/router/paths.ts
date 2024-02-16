enum Paths {
    DEFAULT = '/',
    MAIN = '/main',
    AUTH = '/auth',
    LOGIN = 'login',
    REGISTRATION = 'registration',
    RESULT = '/result',
    FORGOT_PASSWORD = 'forgot-password',
    CHANGE_PASSWORD = 'change-password',
    CONFIRM_EMAIL = 'confirm-email',
    ERROR = 'error',
    ERROR_LOGIN = 'error-login',
    ERROR_USER_EXIST = 'error-user-exist',
    ERROR_CHECK_EMAIL = 'error-check-email',
    ERROR_CHECK_EMAIL_NO_EXIST = 'error-check-email-no-exist',
    ERROR_CHANGE_PASSWORD = 'error-change-password',
    SUCCESS = 'success',
    SUCCESS_PASSWORD_CHANGE = 'success-password-change',
    NotFound = '*',
}

export default Paths;
