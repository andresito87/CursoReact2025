import axios from "axios";
import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse, AuthErrorResponse } from "../interfaces/auth.response";

export const registerAction = async (
    fullName: string,
    email: string,
    password: string
): Promise<AuthResponse> => {
    try {
        const { data } = await tesloApi.post<AuthResponse>("/auth/register", {
            fullName,
            email,
            password,
        });

        return data;
    } catch (error) {
        if (axios.isAxiosError<AuthErrorResponse>(error)) {
            throw error.response?.data ?? {
                message: "Error en el registro",
                error: "Bad Request",
                statusCode: 400,
            };
        }

        throw {
            message: "Ha ocurrido un error inesperado",
            error: "Internal Error",
            statusCode: 500,
        } satisfies AuthErrorResponse;
    }
};