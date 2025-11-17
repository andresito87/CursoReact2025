import { act, renderHook } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { useCounter } from "./useCounter";

describe('useCounter', () => {

    test('should initialize with default value of 10', () => {

        const { result } = renderHook(() => useCounter())

        expect(result.current.counter).toBe(20)

    })

    test('should initialize with with value 10', () => {

        const initialValue = 10

        const { result } = renderHook(() => useCounter(initialValue))

        expect(result.current.counter).toBe(initialValue)

    })

    test('should increment counter when handleAdd is called', () => {

        const { result } = renderHook(() => useCounter())

        act(() => {
            result.current.handleAdd()
        })

        expect(result.current.counter).toBe(21)

    })

    test('should decrement counter when handleSubtract is called', () => {

        const { result } = renderHook(() => useCounter())

        act(() => {
            result.current.handleSubtract()
        })

        expect(result.current.counter).toBe(19)

    })

    test('should reset to initial value the counter when handleReset is called', () => {

        const { result } = renderHook(() => useCounter())

        act(() => {
            result.current.handleSubtract()
            result.current.handleSubtract()
            result.current.handleSubtract()
            result.current.handleSubtract()
            result.current.handleSubtract()
        })

        expect(result.current.counter).toBe(15)

        act(() => {
            result.current.handleReset()
        })

        expect(result.current.counter).toBe(20)

    })


})