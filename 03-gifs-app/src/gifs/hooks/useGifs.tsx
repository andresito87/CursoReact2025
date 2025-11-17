import { useRef, useState } from "react"
import type { Gif } from "../interfaces/gif.interface"
import { getGifsByQuery } from "../actions/get-gifs-by-query.action"

// const gifsCache: Record<string, Gif[]> = {} // Cache Registry outside hook, it's another way

export const useGifs = () => {

    const [previousTerms, setPreviousTerms] = useState<string[]>([])
    const [gifs, setGifs] = useState<Gif[]>([])

    const gifsCache = useRef<Record<string, Gif[]>>({})

    const handleTermClicked = async (term: string) => {
        if (gifsCache.current[term]) {
            setGifs(gifsCache.current[term])
            return
        }

        const gifs = await getGifsByQuery(term)
        setGifs(gifs)
        gifsCache.current[term] = gifs // Saving query/results in cache
    }

    const handleSearch = async (query: string) => {
        const queryCleared = query.trim().toLowerCase()

        if (queryCleared.length === 0 || previousTerms.includes(queryCleared)) return

        setPreviousTerms([queryCleared, ...previousTerms].splice(0, 8))

        const gifs = await getGifsByQuery(query)
        setGifs(gifs)
        gifsCache.current[query] = gifs // Saving query/results in cache
    }

    return {
        // Properties
        gifs,
        previousTerms,
        // Methods
        handleTermClicked,
        handleSearch
    }
}
