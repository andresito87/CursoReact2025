import { GiftList } from "./shared/components/GiftList"
import { PreviousSearches } from "./gifs/PreviousSearches"
// import { mockGifs } from "./mock-data/gifs.mock"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"
import { useState } from "react"
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action"
import type { Gif } from "./gifs/interfaces/gif.interface"

export const GifsApp = () => {

    const [previousTerms, setPreviousTerms] = useState<string[]>([])

    const [gifs, setGifs] = useState<Gif[]>([])

    const handleTermClicked = (term: string) => {
        console.log({ term })
    }

    const handleSearch = async (query: string) => {
        const queryCleared = query.trim().toLowerCase()

        if (queryCleared.length === 0 || previousTerms.includes(queryCleared)) return

        setPreviousTerms([queryCleared, ...previousTerms].splice(0, 8))

        const gifs = await getGifsByQuery(query)

        setGifs(gifs)
    }

    return (
        <>
            {/* Header */}
            <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el gif perfecto" />

            {/* Search */}
            <SearchBar
                placeholder="Busca lo que quieras"
                onQuery={handleSearch} />

            {/* Previous searches */}
            <PreviousSearches
                searches={previousTerms}
                onLabelClicked={handleTermClicked} />

            {/* List of Gifs */}
            <GiftList gifs={gifs} />
        </>
    )
}
