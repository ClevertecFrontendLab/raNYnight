export interface User {
    email: string;
}

export interface LoginData {
    email: string;
    password: string;
    rememberMe?: boolean;
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
    shouldRefetch: boolean;
    lastRegisterRequest: RegisterInput;
}
