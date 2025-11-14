import { ItemCounter } from "./shopping-cart/ItemCounter";

interface ItemInCart {
    productName: string,
    quantity: number
}

const itemsInCart: ItemInCart[] = [
    { productName: 'Nintendo Switch 2', quantity: 3 },
    { productName: 'Super Smash', quantity: 4 },
    { productName: 'Elden Ring', quantity: 6 }
]

export function FirstStepsApp() {

    return (
        <>
            <h1>Carrito de compra</h1>
            {itemsInCart.map(({ productName, quantity }: ItemInCart) => (
                <ItemCounter key={productName} name={productName} quantity={quantity} />
            ))}

            {/* <ItemCounter name='Elden Ring' quantity={20} />
            <ItemCounter name='Smash' />
            <ItemCounter name='Destiny 2' quantity={30} /> */}
        </>
    )
}