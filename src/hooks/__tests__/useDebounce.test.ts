import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../useDebounce'

// Mock timers for testing debounce functionality
jest.useFakeTimers()

describe('useDebounce', () => {
  beforeEach(() => {
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    jest.useFakeTimers()
  })

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500))

    expect(result.current).toBe('initial')
  })

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    )

    // Initial value should be returned immediately
    expect(result.current).toBe('initial')

    // Change the value
    rerender({ value: 'updated', delay: 500 })

    // Value should not change immediately
    expect(result.current).toBe('initial')

    // Fast-forward time by 250ms (less than delay)
    act(() => {
      jest.advanceTimersByTime(250)
    })

    // Value should still be the old value
    expect(result.current).toBe('initial')

    // Fast-forward time by another 250ms (total 500ms)
    act(() => {
      jest.advanceTimersByTime(250)
    })

    // Now the value should be updated
    expect(result.current).toBe('updated')
  })

  it('should reset timer when value changes before delay completes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    )

    // Change value first time
    rerender({ value: 'first', delay: 500 })

    // Fast-forward by 300ms
    act(() => {
      jest.advanceTimersByTime(300)
    })

    // Value should still be initial
    expect(result.current).toBe('initial')

    // Change value again before delay completes
    rerender({ value: 'second', delay: 500 })

    // Fast-forward by another 300ms (total 600ms from first change, but only 300ms from second)
    act(() => {
      jest.advanceTimersByTime(300)
    })

    // Value should still be initial (second change reset the timer)
    expect(result.current).toBe('initial')

    // Fast-forward by another 200ms (total 500ms from second change)
    act(() => {
      jest.advanceTimersByTime(200)
    })

    // Now the value should be updated to the second value
    expect(result.current).toBe('second')
  })

  it('should work with different delay values', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 1000 },
      }
    )

    // Change value
    rerender({ value: 'updated', delay: 1000 })

    // Fast-forward by 500ms (less than 1000ms delay)
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Value should still be initial
    expect(result.current).toBe('initial')

    // Fast-forward by another 500ms (total 1000ms)
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Now the value should be updated
    expect(result.current).toBe('updated')
  })

  it('should work with zero delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 0 },
      }
    )

    // Change value
    rerender({ value: 'updated', delay: 0 })

    // With zero delay, value should update immediately on next tick
    act(() => {
      jest.advanceTimersByTime(0)
    })

    expect(result.current).toBe('updated')
  })

  it('should handle multiple rapid changes correctly', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    )

    // Make multiple rapid changes
    rerender({ value: 'change1', delay: 500 })
    act(() => {
      jest.advanceTimersByTime(100)
    })

    rerender({ value: 'change2', delay: 500 })
    act(() => {
      jest.advanceTimersByTime(100)
    })

    rerender({ value: 'change3', delay: 500 })
    act(() => {
      jest.advanceTimersByTime(100)
    })

    rerender({ value: 'final', delay: 500 })

    // Value should still be initial
    expect(result.current).toBe('initial')

    // Fast-forward by 500ms from the last change
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Should only reflect the final value
    expect(result.current).toBe('final')
  })

  it('should work with different data types', () => {
    // Test with number
    const { result: numberResult, rerender: numberRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 0, delay: 100 },
      }
    )

    numberRerender({ value: 42, delay: 100 })
    act(() => {
      jest.advanceTimersByTime(100)
    })
    expect(numberResult.current).toBe(42)

    // Test with object
    const { result: objectResult, rerender: objectRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: { name: 'initial' }, delay: 100 },
      }
    )

    objectRerender({ value: { name: 'updated' }, delay: 100 })
    act(() => {
      jest.advanceTimersByTime(100)
    })
    expect(objectResult.current).toEqual({ name: 'updated' })

    // Test with array
    const { result: arrayResult, rerender: arrayRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: [1, 2, 3], delay: 100 },
      }
    )

    arrayRerender({ value: [4, 5, 6], delay: 100 })
    act(() => {
      jest.advanceTimersByTime(100)
    })
    expect(arrayResult.current).toEqual([4, 5, 6])
  })

  it('should clean up timeout on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout')

    const { unmount, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    )

    // Change value to trigger a timeout
    rerender({ value: 'updated', delay: 500 })

    // Unmount the component
    unmount()

    // Verify that clearTimeout was called
    expect(clearTimeoutSpy).toHaveBeenCalled()

    clearTimeoutSpy.mockRestore()
  })

  it('should handle delay changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 1000 },
      }
    )

    // Change both value and delay
    rerender({ value: 'updated', delay: 200 })

    // Fast-forward by 200ms (new delay)
    act(() => {
      jest.advanceTimersByTime(200)
    })

    // Value should be updated with the new delay
    expect(result.current).toBe('updated')
  })
})
