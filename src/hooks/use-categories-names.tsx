import { useCallback } from 'react'
import useAxios from '~/hooks/use-axios'
import { defaultResponses } from '~/constants'
import { categoryService } from '~/services/category-service'
import { ErrorResponse, ItemsWithCount, CategoryNameInterface } from '~/types'

interface UseCategoriesNamesProps {
  page?: number
  limit?: number
  fetchOnMount?: boolean
}

interface UseCategoriesNamesResult {
  loading: boolean
  response: ItemsWithCount<CategoryNameInterface>
  fetchData: () => Promise<void>
  error: ErrorResponse | null
}

const useCategoriesNames = ({
  page = 1,
  limit = 10,
  fetchOnMount = true
}: UseCategoriesNamesProps = {}): UseCategoriesNamesResult => {
  const getCategoriesNames = useCallback(() => {
    return categoryService.getCategoriesNames(page, limit)
  }, [page, limit])

  const { loading, response, fetchData, error } = useAxios<
    ItemsWithCount<CategoryNameInterface>
  >({
    service: getCategoriesNames,
    fetchOnMount,
    defaultResponse: defaultResponses.itemsWithCount
  })

  return { loading, response, fetchData, error }
}

export default useCategoriesNames
