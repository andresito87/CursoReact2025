import { describe, expect, test, vi } from "vitest";
import { appRouter } from "./app.router";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, Outlet, RouterProvider, useParams } from "react-router";

// Creamos un mock de nuestro HomePage para comprobar si existe en la renderización del AppRouter
vi.mock('@/heroes/pages/home/HomePage', () => ({
    HomePage: () => <div data-testid="home-page"></div>
}));

// Creamos mock del componente HeroPage
vi.mock('@/heroes/pages/hero/HeroPage', () => ({
    HeroPage: () => {
        const { idSlug = '' } = useParams();

        // Devolvemos en el mock un functiona Component con el idSlug del Hero recogido desde los parámetros de ruta
        return (
            <div data-testid="hero-page" >
                HeroPage - {idSlug}
            </div>
        );
    }
}));

// Creamos mock del componente que utiliza carga perezosa Lazy
vi.mock('@/heroes/pages/search/SearchPage', () => ({
    default: () => <div data-testid='search-page'></div>
}));

// Creamos mock del Layout para comprobar si efectivamente se renderiza ese layout en el AppRoute
vi.mock('@/heroes/pages/hero/layouts/HeroesLayout', () => ({
    HeroesLayout: () => (
        <div data-testid="heroes-layout">
            <Outlet />
        </div>
    )
}));

describe('appRouter', () => {

    test('should be configured as expected', () => {

        expect(appRouter.routes).toMatchSnapshot();

    });

    test('should render home page at root path', () => {

        // Crea un router en memoria para pruebas
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/'] // Ruta donde el router de pruebas esta situado
        });

        render(<RouterProvider router={router} />);

        expect(screen.getByTestId('home-page')).toBeDefined();

    });

    test('should render hero page at /heroes/:idSlug path', () => {

        // Crea un router en memoria para pruebas
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/heroes/superman'] // Ruta donde el router de pruebas esta situado
        });

        render(<RouterProvider router={router} />);

        expect(screen.getByTestId('hero-page').innerHTML).toContain('superman');

    });

    test('should render search page at /search path', async () => {

        // Crea un router en memoria para pruebas
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/search'] // Ruta donde el router de pruebas esta situado
        });

        render(<RouterProvider router={router} />);

        expect(await screen.findByTestId('search-page')).toBeDefined(); // await porque el componente utiliza carga perezosa

    });

    test('should redirect to home page for unknown routes', () => {

        // Crea un router en memoria para pruebas
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/no-existe'] // Ruta donde el router de pruebas esta situado
        });

        render(<RouterProvider router={router} />);

        expect(screen.getByTestId('home-page')).toBeDefined();

    });

});