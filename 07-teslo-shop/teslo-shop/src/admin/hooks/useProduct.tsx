import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductByIdAction } from "../actions/get-product-by-id.action";
import type { Product } from "@/interfaces/product.interface";
import { createUpdateProductAction } from "../actions/create-update-product.action";

export const useProduct = (id: string) => {

    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutos
        // enabled: !!id // se dispara la petición en cuanto tenga un id
    });

    // Mutación o cambio de la data del producto através de mutationes de Tanstack
    const mutation = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: (product: Product) => {
            // Invalidamos la caché que tenga como clave producto y productos para actualizar 
            // el listado mostrado al usuario sin recargar la página
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.setQueryData(['product', { id: product.id }], product);
        }
    });

    return {
        ...query,
        mutation
    };
};
