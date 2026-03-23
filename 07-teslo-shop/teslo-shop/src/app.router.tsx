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

export const appRouter = createBrowserRouter([
    // Main routes
    {
        path: '/',
        Component: ShopLayout,
        children: [
            {
                index: true,
                Component: HomePage
            },
            {
                path: 'product/:idSlug',
                Component: ProductPage
            },
            {
                path: 'gender/:gender',
                Component: GenderPage
            }
        ]
    },

    // Auth Routes
    {
        path: '/auth',
        lazy: async () => ({ Component: (await import("./auth/layouts/AuthLayout")).default }),
        children: [
            {
                index: true,
                loader: () => redirect('/auth/login') // si alguien intenta acceder a /auth será redireccionado al /login automáticamente
            },
            {
                path: 'login',
                Component: LoginPage
            },
            {
                path: 'register',
                Component: RegisterPage
            },
        ]
    },

    // Admin Routes
    {
        path: '/admin',
        lazy: async () => ({ Component: (await import("./admin/layouts/AdminLayout")).default }),
        children: [
            {
                index: true,
                Component: DashboardPage
            },
            {
                path: "products",
                Component: AdminProductsPage
            },
            {
                path: "products/:id",
                Component: AdminProductPage
            },
        ]
    },
    {
        path: '*',
        loader: () => redirect('/')
    }
]);
