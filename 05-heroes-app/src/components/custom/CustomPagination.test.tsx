import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { CustomPagination } from "./CustomPagination";
import { MemoryRouter } from "react-router";
import type { PropsWithChildren } from "react";

vi.mock('../ui/button', () => ({
    Button: ({ children, ...props }: PropsWithChildren) => (
        <button {...props}>{children}</button>
    )
}));

// Creamos un mock del Router para tener un contexto donde ejecutar las pruebas
const renderWithRouter = (
    component: React.ReactElement,
    initialEntries?: string[]
) => {

    return render(
        <MemoryRouter
            initialEntries={initialEntries}
        >
            {component}
        </MemoryRouter>
    );
};

describe('CustomPagination', () => {

    test('sould render component with default values', () => {

        renderWithRouter(<CustomPagination totalPages={5} />);

        expect(screen.getByText('Anteriores')).toBeDefined();
        expect(screen.getByText('Siguientes')).toBeDefined();

        expect(screen.getByText('1')).toBeDefined();
        expect(screen.getByText('2')).toBeDefined();
        expect(screen.getByText('3')).toBeDefined();
        expect(screen.getByText('4')).toBeDefined();
        expect(screen.getByText('5')).toBeDefined();
    });

    test('should disabled previous button when page is 1', () => {

        // Creamos una paginación mockeada con un router mockeado para la navegación
        renderWithRouter(<CustomPagination totalPages={5} />); // Le decimos que la paginación mockeada tiene 5 páginas

        const previousButton = screen.getByText('Anteriores'); // Busca el botón con ese texto en árbol HTML

        expect(previousButton.getAttributeNames()).toContain('disabled');

    });

    test('should disabled next button when we are in the last page', () => {

        // Creamos una paginación mockeada con un router mockeado para la navegación
        renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=5']); // Le digo al router de pruebas que vaya a la última página, la 5

        const nextButton = screen.getByText('Siguientes'); // Busca el botón con ese texto en árbol HTML

        expect(nextButton.getAttributeNames()).toContain('disabled');

    });

    test('should disabled button 3 when we are in the page 3', () => {

        // Creamos una paginación mockeada con un router mockeado para la navegación
        renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=3']); // Le digo al router de pruebas que vaya a la página 3

        const button2 = screen.getByText('2'); // Busca el botón con ese texto en árbol HTML
        const button3 = screen.getByText('3'); // Busca el botón con ese texto en árbol HTML

        expect(button2.getAttribute('variant')).toContain('outline'); // Compruebo que el atributo del botón tenga ese valor concreto
        expect(button3.getAttribute('variant')).toContain('default'); // Compruebo que el atributo del botón tenga ese valor concreto

    });

    test('should change page when click on number button', () => {

        // Creamos una paginación mockeada con un router mockeado para la navegación
        renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=3']); // Le digo al router de pruebas que vaya a la página 3

        const button2 = screen.getByText('2'); // Busca el botón con ese texto en árbol HTML
        const button3 = screen.getByText('3'); // Busca el botón con ese texto en árbol HTML

        expect(button2.getAttribute('variant')).toContain('outline'); // Compruebo que el atributo del botón tenga ese valor concreto
        expect(button3.getAttribute('variant')).toContain('default'); // Compruebo que el atributo del botón tenga ese valor concreto

        fireEvent.click(button2);

        expect(button2.getAttribute('variant')).toContain('default'); // Compruebo que el atributo del botón tenga ese valor concreto
        expect(button3.getAttribute('variant')).toContain('outline'); // Compruebo que el atributo del botón tenga ese valor concreto

    });

});