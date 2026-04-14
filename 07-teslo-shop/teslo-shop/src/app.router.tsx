import { createBrowserRouter, redirect } from "react-router";
import { ShopLayout } from "./shop/layouts/ShopLayout";
import { HomePage } from "./shop/pages/home/HomePage";
import { ProductPage } from "./shop/pages/product/ProductPage";
import { GenderPage } from "./shop/pages/gender/GenderPage";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";
import { DashboardPage } from "./admin/pages/dashboard/DashboardPage";
import { AdminProductsPage } from "./admin/pages/products/AdminProductsPage";
import { AdminProductPage } from "./admin/pages/product/AdminProductPage";
import {
    NotAuthenticatedRoute,
    AdminRoute,
} from "./components/routes/ProtectedRoutes";

export const appRouter = createBrowserRouter([
    {
        path: '/',
        Component: ShopLayout,
        children: [
            {
                index: true,
                Component: HomePage,
            },
            {
                path: 'product/:idSlug',
                Component: ProductPage,
            },
            {
                path: 'gender/:gender',
                Component: GenderPage,
            },
        ],
    },

    {
        path: '/auth',
        lazy: async () => {
            const { AuthLayout } = await import("./auth/layouts/AuthLayout");
            // Protección de ruta
            const ProtectedAuthLayout = () => (
                <NotAuthenticatedRoute>
                    <AuthLayout />
                </NotAuthenticatedRoute>
            );

            return { Component: ProtectedAuthLayout };
        },
        children: [
            {
                index: true,
                loader: () => redirect('/auth/login'),
            },
            {
                path: 'login',
                Component: LoginPage,
            },
            {
                path: 'register',
                Component: RegisterPage,
            },
        ],
    },

    {
        path: '/admin',
        lazy: async () => {
            const { AdminLayout } = await import("./admin/layouts/AdminLayout");
            // Protección de ruta
            const ProtectedAdminLayout = () => (
                <AdminRoute>
                    <AdminLayout />
                </AdminRoute>
            );

            return { Component: ProtectedAdminLayout };
        },
        children: [
            {
                index: true,
                Component: DashboardPage,
            },
            {
                path: "products",
                Component: AdminProductsPage,
            },
            {
                path: "products/:id",
                Component: AdminProductPage,
            },
        ],
    },

    {
        path: '*',
        loader: () => redirect('/'),
    },
]);