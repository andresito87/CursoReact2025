import { createBrowserRouter, Navigate } from "react-router";
import { AboutPage } from "../pages/about/AboutPage";
import { ProfilePage } from "../pages/profile/ProfilePage";
import { LoginPage } from "../pages/auth/LoginPage";
import { PrivateRoute } from "./PrivateRoute";

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AboutPage />,
    },
    {
        path: "/profile",
        element: <PrivateRoute element={<ProfilePage />} />, // privatizamos una ruta utilizando un functional component como guard através del contexto
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: '*', // cualquier ruta que no sea ninguna de las anteriores
        element: <Navigate to='/' /> // navega a ruta específica
    }
]);