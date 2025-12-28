import { createBrowserRouter, Navigate } from "react-router";
import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HeroesLayout } from "@/heroes/pages/hero/layouts/HeroesLayout";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { lazy } from "react";

const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage')); // Carga perezosa de la página de búsqueda, carga de recursos bajo demanda

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <HeroesLayout />,
        children: [
            {
                index: true,  // es la ruta por defecto de este path
                element: <HomePage />
            },
            {
                path: 'heroes/:idSlug', // slug dinámico, argumento en la url que usamos para obtener la info del heroe
                element: <HeroPage />
            },
            {
                path: 'search',
                element: <SearchPage />
            },
            {
                path: '*',
                element: <Navigate to='/' />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPage />
            }
        ]
    }
]);