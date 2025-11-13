interface Person {
    firstName: string;
    lastName: string;
    age: number;
    address: Address // Interface Composition
}

interface Address {
    postalCode: string;
    city: string;
}

const ironman: Person = {
    firstName: 'Tony',
    lastName: 'Stark',
    age: 38,
    address: {
        postalCode: 'ABC123',
        city: 'New York'
    }
}

console.log(ironman)

// const spiderman = structuredClone(ironman) // spread operator {... ironman} don't do a deep copy

// spiderman.firstName = 'Peter'
// spiderman.lastName = 'Parker'
// spiderman.age = 22
// spiderman.address.city = "San Francisco"

// console.log(ironman, spiderman)