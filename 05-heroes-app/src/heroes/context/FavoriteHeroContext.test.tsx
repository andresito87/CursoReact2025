import { use } from "react";
import type { Hero } from "../types/hero.interface";
import { FavoriteHeroContext, FavoriteHeroProvider } from "./FavoriteHeroContext";
import { afterEach, describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

const mockHero = {
    id: '1',
    name: 'batman'
} as Hero;

// Creamos un componente o sujeto de pruebas que consumne el contexto
const TestComponent = () => {

    const {
        favoriteCount,
        favorites,
        isFavorite,
        toggleFavorite
    } = use(FavoriteHeroContext);
    return (
        <div>
            <div data-testid="favorite-count">{favoriteCount}</div>

            <div data-testid="favorite-list">{
                favorites.map(hero => (
                    <div key={hero.id} data-testid={`hero-${hero.id}`}>
                        {hero.name}
                    </div>
                ))}
            </div>

            <button data-testid='toggle-favorite'
                onClick={() => toggleFavorite(mockHero)}>
                Toggle Favorite
            </button>

            <div data-testid='is-favorite'>
                {isFavorite(mockHero).toString()}
            </div>

        </div>
    );

};

const renderContextTest = () => {

    return render(
        <FavoriteHeroProvider>
            <TestComponent />
        </FavoriteHeroProvider>
    );
};

describe('FavoriteHeroContext', () => {

    afterEach(() => {
        localStorage.clear();
    });

    test('should initialize with default values', () => {

        renderContextTest();

        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('favorite-list').children.length).toBe(0);

    });

    test('should add hero to favorites when toggleFavorite is called with new Hero', () => {

        renderContextTest();

        const button = screen.getByTestId('toggle-favorite');

        fireEvent.click(button);

        // screen.debug();

        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(screen.getByTestId('hero-1').textContent).toBe('batman');

        expect(localStorage.getItem('favorites')).toBe(
            '[{"id":"1","name":"batman"}]'
        );

    });

    test('should remove hero from favorites when toggleFavorite is called', () => {

        localStorage.setItem('favorites', JSON.stringify([mockHero]));

        renderContextTest();
        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(screen.getByTestId('hero-1').textContent).toBe('batman');

        const button = screen.getByTestId('toggle-favorite');

        fireEvent.click(button);

        // screen.debug();

        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('is-favorite').textContent).toBe('false');
        expect(screen.queryByTestId('hero-1')).toBeNull(); // 'query' comprueba si existe y no lanza excepción si es nulo

        expect(localStorage.getItem('favorites')).toBe('[]');

    });

});