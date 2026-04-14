import { useAuthStore } from "@/auth/store/auth.store";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

// Validador si es una ruta que necesita autenticación y el usuario SI está autenticado
export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {

    const { authStatus } = useAuthStore();

    if (authStatus === 'checking') {
        return null;
    }

    if (authStatus === 'not-authenticated') {
        return <Navigate to="/auth/login" />;
    }

    return children;
};

// Validador si es una ruta que necesita autenticación y el usuario NO está autenticado
export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {

    const { authStatus } = useAuthStore();

    if (authStatus === 'checking') {
        return null;
    }

    if (authStatus === 'authenticated') {
        return <Navigate to="/" />;
    }

    return children;
};

// Validador si la ruta es administrativa, el usuario SI está autenticado y tiene rol de Admin
export const AdminRoute = ({ children }: PropsWithChildren) => {

    const { authStatus, isAdmin } = useAuthStore();

    if (authStatus === 'checking') {
        return null;
    }

    if (authStatus === 'not-authenticated') {
        return <Navigate to="/auth/login" />;
    }

    if (!isAdmin()) {
        return <Navigate to="/" />;
    }

    return children;
};