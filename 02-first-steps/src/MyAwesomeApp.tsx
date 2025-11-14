import type { CSSProperties } from "react"

export const MyAwesomeApp = () => {

    const firstName = 'Andrés'
    const lastName = 'Podadera'

    const favoriteGames = ['Elden Ring', 'Metal Gears', 'Destiny 2']
    const isActive = true

    const address = {
        zipCode: 'ABC-123',
        country: 'Canadá'
    }

    const myStyles: CSSProperties = {
        backgroundColor: '#fafafa',
        borderRadius: 10,
        padding: 10,
        marginTop: 30
    }

    return (
        <>
            <h1>{firstName}</h1>
            <h3>{lastName}</h3>
            <p>{favoriteGames.join(', ')}</p>
            <h1>{isActive ? 'Activo' : 'No activo'}</h1>
            <p
                style={myStyles}

            >{JSON.stringify(address)}</p>
        </>
    )
}

// export function MyAwesomeApp() {
//     return (
//         <>
//             <h1>Andrés</h1>
//             <h3>Podadera</h3>
//         </>
//     )
// }