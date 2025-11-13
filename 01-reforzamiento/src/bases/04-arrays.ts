const myArray: number[] = [1, 2, 3, 4, 5]
const myArray3: (number | string)[] = [1, 2, 3, 4, 5] // not recomended mix several data types

myArray.push(20)
myArray.push(21)

const myArray2 = [...myArray] // allow us to create a new array, change the array's reference

myArray2.push(9)
myArray3.push("Hola")

console.log(myArray)
console.log(myArray2)
console.log(myArray3)

// for (const myNumber of myArray) {
//     console.log(myNumber + 10)
// }