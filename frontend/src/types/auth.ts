export interface LoginFormData {
    username: string;
    password: string;
    studentId: string;
    institution: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
    encrypted_password?: string;
}

export interface ValidationError {
    loc: string[];
    msg: string;
    type: string;
}

export interface AuthState {
    username: string;
    studentId: string;
    institution: string;
    accessToken: string;
    encryptedPassword?: string;
    rememberMe: boolean;
}

export interface AuthActions {
    setAuth: (payload: Partial<AuthState>) => void;
    clearAuth: () => void;
    storageType: () => Storage;
} 