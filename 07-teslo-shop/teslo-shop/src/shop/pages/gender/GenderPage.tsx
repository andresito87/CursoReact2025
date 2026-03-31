import { useParams } from "react-router";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { products } from "@/mocks/products.mock";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";

export const GenderPage = () => {

    const { gender } = useParams();

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

            <ProductsGrid products={products} />

            <CustomPagination totalPages={7} />
        </>
    );
};
