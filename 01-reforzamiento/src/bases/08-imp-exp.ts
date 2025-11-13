import { heroes, IHero, Owner } from "./data/heroes.data"

const getHeroById = (id: number): IHero | undefined => {

    const hero = heroes.find((hero: IHero) => {
        return hero.id === id
    })

    // if (!hero) {
    //     throw new Error(`No existe un héroe con el id ${id}`)
    // }

    return hero
}

// console.log(getHeroById(2))
// console.log(getHeroById(7)) // undefined

export const getHeroesByOwner = (owner: Owner): IHero[] => {
    return heroes.filter((hero) => hero.owner === owner)
}