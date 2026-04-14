import { tesloApi } from "@/api/tesloApi";
import type { AuthErrorResponse, AuthResponse } from "../interfaces/auth.response";
import axios from "axios";

export const loginAction = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    try {
        const { data } = await tesloApi.post<AuthResponse>("/auth/login", {
            email,
            password,
        });

        return data;
    } catch (error) {
        if (axios.isAxiosError<AuthErrorResponse>(error)) {
            const statusCode = error.response?.data?.statusCode ?? 400;

            throw {
                message: ["Correo y/o contraseña incorrectos"],
                error: "Bad Request",
                statusCode,
            } satisfies AuthErrorResponse;
        }

        throw {
            message: ["Ha ocurrido un error inesperado"],
            error: "Internal Error",
            statusCode: 500,
        } satisfies AuthErrorResponse;
    }
};