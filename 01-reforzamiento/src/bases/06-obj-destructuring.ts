const person = {
    name: 'Tony',
    age: 45,
    key: 'Ironman'
}

const { key, name: ironmanName, age } = person // change variable name so can use name in other place
console.log({ ironmanName, age, key })


interface Hero {
    name: String,
    age: number,
    key: string,
    rank?: string
}

const useContext = ({ key, name, age, rank = 'Sin rango' }: Hero) => {
    return {
        keyName: key,
        user: {
            name,
            age
        },
        rank: rank
    }
}

const {
    keyName,
    rank,
    user,
    // user: { name }
} = useContext(person)
const { name } = user; // much easy to read

console.log({ keyName })
console.log({ rank })
console.log({ name })
