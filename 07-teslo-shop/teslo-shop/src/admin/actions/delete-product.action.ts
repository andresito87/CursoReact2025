import { tesloApi } from "@/api/tesloApi";

export const deleteProductAction = async (id: string): Promise<void> => {
    await tesloApi({
        url: `/products/${id}`,
        method: 'DELETE'
    });
};
