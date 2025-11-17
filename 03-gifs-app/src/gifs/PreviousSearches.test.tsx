import { describe, expect, test, vi } from "vitest";
import { PreviousSearches } from "./PreviousSearches";
import { fireEvent, render, screen } from "@testing-library/react";

describe('PreviousSearches', () => {

    test('should be the label and should be clikable', () => {

        const searches = ['goku']
        const onLabelClicked = vi.fn()

        render(<PreviousSearches searches={searches} onLabelClicked={onLabelClicked} />)

        const label = screen.getByRole('listitem')
        fireEvent.click(label)

        expect(label).toBeDefined()
        expect(onLabelClicked).toHaveBeenCalledTimes(1)

    })

})