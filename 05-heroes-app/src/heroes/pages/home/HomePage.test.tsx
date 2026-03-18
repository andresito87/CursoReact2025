import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, test, vi } from "vitest";
import { HomePage } from "./HomePage";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroContext";

// Creamos mock del hook de paginación
vi.mock('@/heroes/hooks/usePaginatedHero');

// Creamos referencia al mock para facilitar el uso y la configuración de la instancia
const mockUsePaginatedHero = vi.mocked(usePaginatedHero);

// Indicamos la data ficticia que debe devolver nuestra paginación mockeada
mockUsePaginatedHero.mockReturnValue({
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
} as unknown as ReturnType<typeof usePaginatedHero>); // le decimos que esa data es del tipo que devuelve el hook que estamos probando

// Query client de Tanstack que usara nuestro proveedor en el contexto mockeado
const queryClient = new QueryClient();

// Componente mockeado con su contexto de favoritos y el proveedor de TanStack query
const renderHomePage = (initialEntries: string[] = ['/']) => {

    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <FavoriteHeroProvider>
                <QueryClientProvider client={queryClient}>
                    <HomePage />
                </QueryClientProvider>
            </FavoriteHeroProvider>
        </MemoryRouter>
    );

};

describe('HomePage', () => {

    // Limpieza de los mocks después de cada test, para que no se reutilice data de tests ya realizados
    afterEach(() => {
        vi.clearAllMocks();
    });

    test('should render HomePage with default values', () => {

        const { container } = renderHomePage();

        expect(container).toMatchSnapshot();

    });

    test('should call usePaginatedHero with default values', () => {

        renderHomePage();

        expect(mockUsePaginatedHero).toBeCalledWith(1, 6, 'all');
    });

    test('should call usePaginatedHero with custom query params', () => {

        renderHomePage(['/?page=2&limit=10&category=villains']);

        expect(mockUsePaginatedHero).toBeCalledWith(2, 10, 'villains');

    });

    test('should call usePaginatedHero with default page and same limit on tab villains clicked', () => {

        renderHomePage(['/?tab=favorites&page=2&limit=10']);

        // const [allTabs, favoriteTab, heroesTab, villainTab] = screen.getByRole('tab');
        const [, , , villainsTab] = screen.getAllByRole('tab'); // usamos comas para desestructurar

        fireEvent.click(villainsTab);

        expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 10, 'villain');

    });

});