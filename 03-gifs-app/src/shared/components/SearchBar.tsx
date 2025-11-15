import { useEffect, useState, type KeyboardEvent } from "react"

interface Props {
    placeholder?: string,
    onQuery: (query: string) => void
}

export const SearchBar = ({ placeholder = "Buscar", onQuery }: Props) => {

    const [query, setQuery] = useState('')

    useEffect(() => { // implementing debouncing
        const timeoutId = setTimeout(() => {
            onQuery(query)
        }, 700)

        return () => { // cleaning function of effect
            clearTimeout(timeoutId)

        }
    })

    const handleSearch = () => {
        onQuery(query)
        // setQuery('') // clear input text after to search
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                onClick={handleSearch}
            >Buscar</button>
        </div>
    )
}
