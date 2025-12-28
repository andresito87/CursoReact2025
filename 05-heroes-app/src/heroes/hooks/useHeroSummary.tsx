import { useQuery } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/get-summary.action";

export const useHeroSummary = () => {

    // tanstack para almacenar y recuperar data de la caché
    // regresa todo el objeto de useQuery con los elementos de loading y errores
    return useQuery({
        queryKey: ['summary-information'],
        queryFn: getSummaryAction,
        staleTime: 1000 * 60 * 5 // 5 minutos
    });
};
