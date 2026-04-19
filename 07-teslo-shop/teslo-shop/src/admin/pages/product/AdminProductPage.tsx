import { Navigate, useNavigate, useParams } from 'react-router';
import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { AdminProductForm } from './ui/AdminProductForm';
import type { Product } from '@/interfaces/product.interface';
import { toast } from 'sonner';

export const AdminProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        data: product,
        isLoading,
        isError,
        mutation
    } = useProduct(id ?? '');

    const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
    const subTitle =
        id === 'new'
            ? 'Aquí puedes crear un nuevo producto'
            : 'Aquí puedes editar el producto';

    const handleSubmit = async (productLike: Partial<Product> & { files?: File[]; }) => { // Concatenación o Unión de tipos con &
        await mutation.mutateAsync(productLike, {
            onSuccess: (data) => {
                toast.success('Producto actualizado correctamente', {
                    position: 'top-right'
                });

                if (id === 'new') {
                    navigate(`/admin/products/${data.id}`);
                }
            },
            onError: () => {
                toast.error('Error al actualizar el producto');
            }
        });
    };

    if (isError) {
        return <Navigate to="/admin/products" />;
    }

    if (isLoading) {
        return <CustomFullScreenLoading />;
    }

    if (!product) {
        return <Navigate to='/admin/products' />;
    }

    return (
        <>
            <AdminProductForm
                title={title}
                subTitle={subTitle}
                product={product}
                onSubmit={handleSubmit}
                isPending={mutation.isPending}
            />
        </>
    );
};
