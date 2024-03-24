export interface LoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface LoginResponse {
    accessToken: string;
}

export interface EmailResponse {
    email: string;
    message: string;
}

export interface ConfirmEmailRequest {
    email: string;
    code: string;
}

export interface ChangePasswordRequest {
    password: string;
    confirmPassword: string;
}

export interface RegisterInput {
    email: string;
    password: string;
}

export interface ApiError {
    status: number;
    data: {
        statusCode: number;
        error: string;
        message: string;
    };
}

export interface AuthStore {
    authToken: string | null;
    rememberMe: boolean;
    shouldRefetch: boolean;
    lastRegisterRequest: RegisterInput;
    forgotEmail: string;
}

export interface Period {
    text: string;
    cost: number;
    days: number;
}

export interface Tariff {
    _id: string;
    name: string;
    periods: Period[];
}

export interface UserData {
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    imgSrc: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    tariff:
        | {
              tariffId: string;
              expired: string;
          }
        | undefined;
}
