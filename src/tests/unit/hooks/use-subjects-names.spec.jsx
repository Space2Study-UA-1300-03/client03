import { vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import useSubjectsNames from '~/hooks/use-subjects-names'
import { subjectService } from '~/services/subject-service'

vi.mock('~/services/subject-service')

const mockSubjectsNames = {
  data: [
    { _id: '1', name: 'Subject 1' },
    { _id: '2', name: 'Subject 2' }
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

describe('useSubjectsNames', () => {
  it('fetches subjects with a category successfully', async () => {
    subjectService.getSubjectsNames.mockResolvedValueOnce({
      data: mockSubjectsNames
    })

    const { result } = renderHook(() =>
      useSubjectsNames({ category: 'category' })
    )

    expect(subjectService.getSubjectsNames).toHaveBeenCalledWith(
      'category',
      1,
      10
    )

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.response).toEqual(mockSubjectsNames)
    })
  })

  it('handles API errors', async () => {
    subjectService.getSubjectsNames.mockRejectedValueOnce({
      response: { data: mockError }
    })

    const { result } = renderHook(() =>
      useSubjectsNames({ category: 'category' })
    )

    expect(subjectService.getSubjectsNames).toHaveBeenCalledWith(
      'category',
      1,
      10
    )

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toEqual(mockError)
    })
  })
})
