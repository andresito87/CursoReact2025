import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
import { getProductsAction } from "../actions/get-products.action";
import type { Gender, Size } from "@/interfaces/product.interface";

export const useProducts = () => {

    const [searchParams] = useSearchParams(); // Parámetro de la url o queryParam
    const { gender } = useParams(); // Segmento de ruta

    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 9;
    const offset = (Number(page) - 1) * Number(limit);
    const sizes = searchParams.get('sizes') as Size;
    const query = searchParams.get('query') || '';

    const price = searchParams.get('price') || 'any';
    let minPrice = undefined;
    let maxPrice = undefined;

    switch (price) {

        case '0-50':
            minPrice = 0;
            maxPrice = 50;
            break;

        case '50-100':
            minPrice = 50;
            maxPrice = 100;
            break;

        case '100-200':
            minPrice = 100;
            maxPrice = 200;
            break;

        case '200+':
            minPrice = 200;
            maxPrice = undefined;
            break;

        default:
            // precio 'any'
            break;
    }


    // Hook utilizada para llamar al api de la parte de productos(todo lo realacionado con ellos)
    return useQuery({
        queryKey: ["products", { offset, limit, sizes, gender, minPrice, maxPrice, query }],
        queryFn: () => getProductsAction({
            limit: isNaN(Number(limit)) ? 9 : limit,
            offset: isNaN(offset) ? 0 : offset,
            sizes: sizes,
            gender: gender === 'kids' ? 'kid' : gender as Gender,
            minPrice,
            maxPrice,
            query: query
        }),
        staleTime: 1000 * 60 * 5 // tiempo que se mantiene cacheado los datos para peticiones con los mismos parámetros
    });
};
