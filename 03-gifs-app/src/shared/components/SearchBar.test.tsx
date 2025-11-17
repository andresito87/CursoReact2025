import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";


describe('SearchBar', () => {

    test('should render searchbar correctly', () => {

        const { container } = render(<SearchBar onQuery={() => { }} />)

        expect(container).toMatchSnapshot()
        expect(screen.getByRole('textbox')).toBeDefined()
        expect(screen.getByRole('button')).toBeDefined()

    })

    test('should call onQuery qith the correct value after 700ms', async () => {

        const onQuery = vi.fn()
        render(<SearchBar onQuery={onQuery} />)

        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'test' } })

        await waitFor(() => { // in asyncronous code, we can wait till resolve that promise, independly of time used in the code
            expect(onQuery).toHaveBeenCalled()
            expect(onQuery).toHaveBeenCalledWith('test')
        })
    })

    test('should call only once with the last value (debounce)', async () => {

        const onQuery = vi.fn()
        render(<SearchBar onQuery={onQuery} />)

        const input = screen.getByRole('textbox')
        // simulating to entering letters in the textbox, only the last query is used
        fireEvent.change(input, { target: { value: 't' } })
        fireEvent.change(input, { target: { value: 'te' } })
        fireEvent.change(input, { target: { value: 'tes' } })
        fireEvent.change(input, { target: { value: 'test' } })

        await waitFor(() => {
            expect(onQuery).toHaveBeenCalledTimes(1)
            expect(onQuery).toHaveBeenCalledWith('test')
        })

    })

    test('should call onQuery when button clicked with the input value', async () => {

        const onQuery = vi.fn()
        render(<SearchBar onQuery={onQuery} />)

        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'test' } })

        const button = screen.getByRole('button')
        fireEvent.click(button)

        expect(onQuery).toHaveBeenCalledTimes(1)
        expect(onQuery).toHaveBeenCalledWith('test')

    })

    test('should the input has the correct placeholder value', async () => {

        const value = "Buscar gif"

        render(<SearchBar onQuery={() => { }} placeholder={value} />)

        expect(screen.getByPlaceholderText(value)).toBeDefined()

    })

    test('should call onQuery when enter is keydown with the input value', async () => {

        const onQuery = vi.fn()
        render(<SearchBar onQuery={onQuery} />)

        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'test2' } })
        fireEvent.keyDown(input, {
            key: 'Enter',
            code: 'Enter',
        })
        fireEvent.keyDown(input, {
            key: 'Back',
            code: 'Back',
        })

        expect(onQuery).toHaveBeenCalledTimes(1)
        expect(onQuery).toHaveBeenCalledWith('test2')

    })

})