import { useState } from "react"


export const useCounter = (initalValue: number = 1) => {

    const [counter, setCounter] = useState(initalValue)

    const increment = () => {
        setCounter(counter + 1)
    }

    const decrement = () => {
        if (counter <= 1) return

        setCounter(counter - 1)
    }

    return {
        // Props
        counter,
        // Methods
        increment,
        decrement
    }
}
