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
        <div>
            <h1 data-testid="first-name-title"> {firstName} </h1>
            <h3> {lastName} </h3>
            <p className="mi-clase-favorita">{favoriteGames.join(', ')}</p>
            <p>{2 + 2}</p>

            <h1>{isActive ? 'Activo' : 'No activo'}</h1>
            <p style={myStyles} >{JSON.stringify(address)}</p>
        </div>
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