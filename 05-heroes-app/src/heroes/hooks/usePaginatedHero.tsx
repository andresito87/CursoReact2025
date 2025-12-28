import { useQuery } from '@tanstack/react-query';
import { getHeroesByPageAction } from '../actions/get-heroes-by-page.action';

export const usePaginatedHero = (page: number, limit: number, category = 'all') => {

    // tanstack para almacenar y recuperar data de la caché
    return useQuery({
        queryKey: ['heroes', { page: page, limit: limit, category: category }], // claves page y limit permiten refrescar la información cuando la url cambia
        queryFn: () => getHeroesByPageAction(Number(page), Number(limit), category), // Como norma general: la función recibe como argumentos los query keys
        staleTime: 1000 * 60 * 5 // en 5 minutos no refrescará la info de la caché
    });
};
