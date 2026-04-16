
// Formateador para el precio y moneda del producto
export const currencyFormatter = (value: number) => {

    return value.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    });
};