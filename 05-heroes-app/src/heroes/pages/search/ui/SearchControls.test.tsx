import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SearchControls } from "./SearchControls";
import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";

// Sobrescribimos el objeto que utiliza el componente de ShadCn pero que no esta disponible en vitest
if (typeof window.ResizeObserver === 'undefined') {
    class ResizeObserver {
        observe() { }
        unobserve() { }
        disconnect() { }
    }

    window.ResizeObserver = ResizeObserver;
}

// Query client de Tanstack que usara nuestro proveedor en el contexto mockeado
const queryClient = new QueryClient();

// Componente mockeado con su contexto de favoritos y el proveedor de TanStack query
const renderSearchControlsWithRouter = (initialEntries: string[] = ['/']) => {

    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <FavoriteHeroProvider>
                <QueryClientProvider client={queryClient}>
                    <SearchControls />
                </QueryClientProvider>
            </FavoriteHeroProvider>
        </MemoryRouter>
    );
};

describe('SearchControls', () => {

    test('should render SearchControls with default values', () => {

        const { container } = renderSearchControlsWithRouter();

        expect(container).toMatchSnapshot();
    });

    test('should set input value when search param name is set', () => {

        renderSearchControlsWithRouter(['/?name=Batman']);

        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');

        expect(input.getAttribute('value')).toBe('Batman');

    });

    test('should change params when inout is changed and enter is pressed', () => {

        // Contenido inicial del valor del query param en la url
        renderSearchControlsWithRouter(['/?name=Batman']);
        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');
        expect(input.getAttribute('value')).toBe('Batman');

        // Simulamos que cambiamos el texto del input de búsqueda a Superman para realizar una búsqueda de superheroes por nombre
        fireEvent.change(input, { target: { value: 'Superman' } });

        // Y presionamos el ENTER para inicar la búsqueda
        fireEvent.keyDown(input, { key: 'Enter' });

        // Analizamos que efectivamente el valor del input cambió
        expect(input.getAttribute('value')).toBe('Superman');

    });

    test('should change params strength when slider is changed', () => {

        // le decimos a nuestro componente mockeado que muestre los filtros avanzados
        renderSearchControlsWithRouter(['/?name=Batman&active-accordion=advanced-filters']);

        // Obtenemos el slider desde el árbol de nodos
        const slider = screen.getByRole('slider');

        expect(slider.getAttribute('aria-valuenow')).toBe('0'); // atributo que introduce Shadcn en el renderizado final del componente

        // Simulamos que el usuario movió el selector del slider hacia la derecha
        fireEvent.keyDown(slider, { key: 'ArrowRight' });

        expect(slider.getAttribute('aria-valuenow')).toBe('1');

    });

    test('should accordion component be openned when active-accordion param is set', () => {

        // le decimos a nuestro componente mockeado que muestre los filtros avanzados y por tanto muestra el acordeón
        renderSearchControlsWithRouter(['/?name=Batman&active-accordion=advanced-filters']);

        // Obtenemos el acordeón desde el árbol de nodos
        const accordion = screen.getByTestId('accordion');
        const accordionItem = accordion.querySelector('div'); // estructura de divs que introduce Shadcn al renderizar sus componentes

        expect(accordionItem?.getAttribute('data-state')).toBe('open'); // atributo que introduce Shadcn en el renderizado final del componente

    });

    test('should accordion component be closed when active-accordion param is not set', () => {

        // le decimos a nuestro componente mockeado que NO muestre los filtros avanzados y por tanto NO muestra el acordeón
        renderSearchControlsWithRouter(['/?name=Batman']);

        // Obtenemos el acordeón desde el árbol de nodos
        const accordion = screen.getByTestId('accordion');
        const accordionItem = accordion.querySelector('div'); // estructura de divs que introduce Shadcn al renderizar sus componentes

        expect(accordionItem?.getAttribute('data-state')).toBe('closed'); // atributo que introduce Shadcn en el renderizado final del componente

    });

});