import { GiftList } from "./shared/components/GiftList"
import { PreviousSearches } from "./gifs/PreviousSearches"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"
import { useGifs } from "./gifs/hooks/useGifs"

export const GifsApp = () => {

    const { gifs, previousTerms, handleSearch, handleTermClicked } = useGifs()

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
