import { deleteProductAction } from "@/admin/actions/delete-product.action";
import { DeleteProductModal } from "@/admin/components/DeleteProductModal";
import { AdminTitle } from "@/admin/components/AdminTitle";
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import type { Product } from "@/interfaces/product.interface";
import { currencyFormatter } from "@/lib/currency-formatter";
import { useProducts } from "@/shop/hooks/useProducts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PencilIcon, PlusIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export const AdminProductsPage = () => {

    const queryClient = useQueryClient();
    const { data, isLoading } = useProducts();
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const deleteMutation = useMutation({
        mutationFn: deleteProductAction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Producto eliminado correctamente', {
                position: 'top-right'
            });
            setProductToDelete(null);
        },
        onError: () => {
            toast.error('Error al eliminar el producto');
            setProductToDelete(null);
        }
    });

    const handleDeleteProduct = async () => {
        if (!productToDelete) return;
        await deleteMutation.mutateAsync(productToDelete.id);
    };

    if (isLoading) {
        return <CustomFullScreenLoading />;
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <AdminTitle
                    title="Productos"
                    subTitle="Aquí puedes ver y administrar tus productos"
                />

                <div className="flex justify-end mb-10 gap-4">
                    <Link to='/admin/products/new' >
                        <Button>
                            <PlusIcon />
                            Nuevo producto
                        </Button>
                    </Link>
                </div>

            </div>

            <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
                <TableHeader>
                    <TableRow>
                        <TableHead>Imagen</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Inventario</TableHead>
                        <TableHead>Tallas</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                            </TableCell>
                            <TableCell>
                                <Link to={`/admin/products/${product.id}`}
                                    className="text-blue-500 underline"
                                >
                                    {product.title}
                                </Link>
                            </TableCell>
                            <TableCell>{currencyFormatter(product.price)}</TableCell>
                            <TableCell>{product.gender}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>{product.sizes.join(', ')}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-3">
                                    <Link to={`/admin/products/${product.id}`}>
                                        <PencilIcon
                                            className="w-4 h-4 text-blue-500"
                                        />
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() => setProductToDelete(product)}
                                        className="cursor-pointer"
                                        aria-label={`Eliminar ${product.title}`}
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <CustomPagination totalPages={data?.pages || 0} />

            <DeleteProductModal
                isOpen={!!productToDelete}
                productName={productToDelete?.title || ''}
                isLoading={deleteMutation.isPending}
                onConfirm={handleDeleteProduct}
                onCancel={() => setProductToDelete(null)}
            />

        </>
    );
};
