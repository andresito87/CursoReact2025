import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import SearchPage from "./SearchPage";
import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import type { Hero } from "@/heroes/types/hero.interface";

// Creamos un mock de nuestro sujeto de pruebas, nuestro Hook de búsqueda
vi.mock('@/heroes/actions/search-heroes.action');
const mockSearchHeroesAction = vi.mocked(searchHeroesAction);

// Creamos un mock de nuestro sujeto de pruebas, nuestro componente Jumbotron
vi.mock('@/components/custom/CustomJumbotron', () => ({
    CustomJumbotron: () => <div data-testid='custom-jumbotron'></div>
}));

// Creamos un mock de nuestro sujeto de pruebas, nuestro componente Jumbotron
vi.mock('./ui/SearchControls', () => ({
    SearchControls: () => <div data-testid='search-controls'></div>
}));

// Creamos un mock de nuestro sujeto de pruebas, nuestro componente HeroGrid, grilla de superheroes
vi.mock('@/heroes/components/HeroGrid', () => ({
    HeroGrid: ({ heroes }: { heroes: Hero[]; }) => (
        <div data-testid='hero-grid'>
            {
                heroes.map((hero) => (
                    <div key={hero.id}>
                        {hero.name}
                    </div>
                ))
            }
        </div>
    )
}));

// Query client de Tanstack que usara nuestro proveedor en el contexto mockeado
const queryClient = new QueryClient();

// Componente mockeado con su contexto de favoritos y el proveedor de TanStack query
const renderSearchPage = (initialEntries: string[] = ['/']) => {

    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <FavoriteHeroProvider>
                <QueryClientProvider client={queryClient}>
                    <SearchPage />
                </QueryClientProvider>
            </FavoriteHeroProvider>
        </MemoryRouter>
    );

};

describe('', () => {

    // Limpieza de los mocks para evitar utilizar datos de unos tests en otros
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('should render SearchPage with default values', () => {

        const { container } = renderSearchPage();

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: "",
            strength: ""
        });

        expect(container).toMatchSnapshot(); // Comparamos que el componente al renderizarse y su snapshot sean iguales

    });

    test('should call search action with name parameter', () => {

        const { container } = renderSearchPage(['/search?name=superman']);

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: "superman",
            strength: ""
        });

        expect(container).toMatchSnapshot(); // Comparamos que el componente al renderizarse y su snapshot sean iguales

    });

    test('should call search action with strength parameter', () => {

        const { container } = renderSearchPage(['/search?strength=6']);

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: "",
            strength: "6" // se envía como string y el componente era el que lo transformaba a number
        });

        expect(container).toMatchSnapshot(); // Comparamos que el componente al renderizarse y su snapshot sean iguales

    });

    test('should call search action with name and strength parameters', () => {

        const { container } = renderSearchPage(['/search?name=spiderman&strength=8']);

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: "spiderman",
            strength: "8" // se envía como string y el componente era el que lo transformaba a number
        });

        expect(container).toMatchSnapshot(); // Comparamos que el componente al renderizarse y su snapshot sean iguales

    });

    test('should render HeroGrid with search results', async () => {

        // Creamos la data ficticia que tiene que devolver nuestro mock
        // Haciendolo así no dependemos de nuestro servidor de pruebas, inyectamos nosotros la data 
        // y tan sólo analizamos que el resultado sea el esperado
        const mockHeroes = [
            { id: '1', name: 'Clark Kent' } as unknown as Hero,
            { id: '2', name: 'Bruce Wayne' } as unknown as Hero
        ];

        // Devolvemos esa data ficticia
        mockSearchHeroesAction.mockResolvedValue(mockHeroes);

        // Renderizamos el componente mockeado o sujeto de pruebas
        renderSearchPage();

        // Esperamos a que termine la búsqueda y analizamos si el resultado es el esperado
        await waitFor(() => {
            expect(screen.getByText('Clark Kent')).toBeDefined();
            expect(screen.getByText('Bruce Wayne')).toBeDefined();
        });

    });

});