import { vi } from 'vitest'
import { renderHook, waitFor, cleanup } from '@testing-library/react'
import useCategoriesNames from '~/hooks/use-categories-names'
import { categoryService } from '~/services/category-service'
import { defaultResponses } from '~/constants'

vi.mock('~/services/category-service')

const mockCategoriesNames = {
  data: [
    { _id: '1', name: 'Category 1' },
    { _id: '2', name: 'Category 2' }
  ],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 2,
    itemsPerPage: 10,
    hasNextPage: false,
    hasPrevPage: false
  }
}

const mockError = {
  status: 404,
  code: 'NOT_FOUND',
  message: 'The requested URL was not found.'
}

afterEach(() => {
  vi.clearAllMocks()
  cleanup()
})

describe('useCategoriesNames', () => {
  it('fetches categories names successfully', async () => {
    categoryService.getCategoriesNames.mockResolvedValueOnce({
      data: mockCategoriesNames
    })

    const { result } = renderHook(() => useCategoriesNames())

    expect(result.current.loading).toBe(true)
    expect(result.current.response).toEqual(defaultResponses.itemsWithCount)

    await waitFor(
      () => {
        expect(categoryService.getCategoriesNames).toHaveBeenCalledWith(1, 10)
        expect(result.current.loading).toBe(false)
        expect(result.current.response).toEqual(mockCategoriesNames)
      },
      { timeout: 5000 }
    )
  })

  it('handles API errors', async () => {
    categoryService.getCategoriesNames.mockRejectedValueOnce({
      response: { data: mockError }
    })

    const { result } = renderHook(() => useCategoriesNames())

    expect(result.current.loading).toBe(true)
    expect(result.current.response).toEqual(defaultResponses.itemsWithCount)

    await waitFor(
      () => {
        expect(categoryService.getCategoriesNames).toHaveBeenCalledWith(1, 10)
        expect(result.current.loading).toBe(false)
        expect(result.current.error).toEqual(mockError)
      },
      { timeout: 5000 }
    )
  })
})
