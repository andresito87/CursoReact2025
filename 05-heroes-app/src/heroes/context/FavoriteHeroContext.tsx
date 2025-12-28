import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroConstext {
    // State
    favorites: Hero[];
    favoriteCount: number;

    // Methods
    isFavorite: (hero: Hero) => boolean;
    toggleFavorite: (hero: Hero) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroConstext);

const getFavoritesFromLocalStorage = (): Hero[] => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
};

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Hero[]>( // estado de favoritos apropiadamente tipado
        getFavoritesFromLocalStorage()
    );

    const toggleFavorite = (hero: Hero) => {
        const heroExist = favorites.find((favorite) => favorite.id === hero.id);

        if (heroExist) {
            const newFavorites = favorites.filter((favorite) => favorite.id !== hero.id);
            setFavorites(newFavorites);
            return;
        }

        setFavorites([...favorites, hero]);
    };

    const isFavorite = (hero: Hero) => {
        return favorites.some((favorite) => favorite.id === hero.id);
    };

    // guardamos en localstorage el array de heroes favoritos
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <FavoriteHeroContext
            value={{
                // State
                favorites: favorites,
                favoriteCount: favorites.length,

                // Methods
                isFavorite: isFavorite,
                toggleFavorite: toggleFavorite
            }}
        >
            {children}
        </FavoriteHeroContext>
    );
};
