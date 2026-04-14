import type { User } from "@/interfaces/user.interface";

export interface AuthResponse {
    user: User;
    token: string;
}

export interface AuthErrorResponse {
    message: string | string[];
    error: string;
    statusCode: number;
}