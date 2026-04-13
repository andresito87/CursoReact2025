import { useParams } from "react-router";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useProducts } from "@/shop/hooks/useProducts";

export const GenderPage = () => {

    const { gender } = useParams();

    const { data } = useProducts();

    let genderLabel = '';

    if (gender === 'men') {
        genderLabel = 'Hombres';
    } else if (gender === 'women') {
        genderLabel = 'Mujeres';
    } else {
        genderLabel = 'Niños';
    }

    return (
        <>
            <CustomJumbotron title={`Productos para ${genderLabel}`} />

            <ProductsGrid products={data?.products || []} />

            <CustomPagination totalPages={data?.pages || 1} />
        </>
    );
};
