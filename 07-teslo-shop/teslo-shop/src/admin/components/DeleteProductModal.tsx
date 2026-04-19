import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteProductModalProps {
    isOpen: boolean;
    productName: string;
    isLoading: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export const DeleteProductModal = ({
    isOpen,
    productName,
    isLoading,
    onConfirm,
    onCancel
}: DeleteProductModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                        <Trash2 className="w-5 h-5 text-red-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        Eliminar producto
                    </h2>
                </div>

                <p className="text-slate-600 mb-6">
                    ¿Estás seguro de que deseas eliminar el producto <span className="font-semibold text-slate-900">"{productName}"</span>? Esta acción no se puede deshacer.
                </p>

                <div className="flex gap-3 justify-end">
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Eliminando...' : 'Eliminar'}
                    </Button>
                </div>
            </div>
        </div>
    );
};
