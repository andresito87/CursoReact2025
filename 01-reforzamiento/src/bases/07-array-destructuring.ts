const characterNames = ['Goku', 'Vegeta', 'Trunks']

const [, , trunks] = characterNames // [] destructuring arrays; {} destrucutring objects

console.log({ trunks })

const returnsArrayFn = () => {
    return ['ABC', 123] as const // say to Typescript that it will always return [string, number] 
}

const [letters, numbers] = returnsArrayFn()

console.log({ letters, numbers })

// Tarea:
const useState = (value: string) => {
    return [value, (newValue: string) => { console.log(newValue) }] as const
}

const [name, setName] = useState('Goku')
console.log({ name })
setName('Vegeta')