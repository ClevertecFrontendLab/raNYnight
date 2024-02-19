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
    shouldRefetch: boolean;
    lastRegisterRequest: RegisterInput;
    forgotEmail: string;
}
