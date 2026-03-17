import type { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { usePaginatedHero } from "./usePaginatedHero";
import { renderHook, waitFor } from "@testing-library/react";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";

// mock del hook
vi.mock('../actions/get-heroes-by-page.action', () => ({
    getHeroesByPageAction: vi.fn()
}));

// Permite personalizar el objeto que devuelve nuestro mock
const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction);

// Cliente para el proveedor de tanStack
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
});

// Proveedor de TanStack para las pruebas, cache en memoria
const tanStackCustomProvider = () => {

    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('usePaginatedHero', () => {

    // Limpiamos mocks y cliente del proveedor de TanStack después de cada uso para limpiar estado e información de peticiones anteriores
    beforeEach(() => {
        vi.clearAllMocks();
        queryClient.clear();
    });

    test('should return the initial state(isLoading)', () => {

        const { result } = renderHook(() => usePaginatedHero(1, 6), {
            wrapper: tanStackCustomProvider()
        });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toBe(undefined);
        expect(result.current.data).toBeUndefined();

    });

    test('should return success state with data when API call succeeds', async () => {

        const mockHeroesData = {
            total: 20,
            pages: 4,
            heroes: []
        };

        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

        const { result } = renderHook(() => usePaginatedHero(1, 6), {
            wrapper: tanStackCustomProvider()
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
        expect(result.current.isSuccess).toBe(true);
        expect(result.current.data).toBeDefined();
        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, 'all');

    });

    test('should call getHeroesByPageAction with those arguments', async () => {

        const mockHeroesData = {
            total: 20,
            pages: 4,
            heroes: []
        };

        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

        const { result } = renderHook(() => usePaginatedHero(2, 16, 'heroes'), {
            wrapper: tanStackCustomProvider()
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
        expect(result.current.isSuccess).toBe(true);
        expect(result.current.data).toBeDefined();
        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(2, 16, 'heroes');

    });

});