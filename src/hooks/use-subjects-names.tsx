import { useCallback } from 'react'
import useAxios from '~/hooks/use-axios'
import { defaultResponses } from '~/constants'
import { subjectService } from '~/services/subject-service'
import { ErrorResponse, ItemsWithCount, SubjectNameInterface } from '~/types'

interface UseSubjectsNamesProps {
  category: string | null
  page?: number
  limit?: number
  fetchOnMount?: boolean
}

interface UseSubjectsNamesResult {
  loading: boolean
  response: ItemsWithCount<SubjectNameInterface>
  fetchData: () => Promise<void>
  error: ErrorResponse | null
}

const useSubjectsNames = ({
  category,
  page = 1,
  limit = 10,
  fetchOnMount = true
}: UseSubjectsNamesProps): UseSubjectsNamesResult => {
  const getSubjectsNames = useCallback(() => {
    return subjectService.getSubjectsNames(category, page, limit)
  }, [category, page, limit])

  const { loading, response, fetchData, error } = useAxios<
    ItemsWithCount<SubjectNameInterface>
  >({
    service: getSubjectsNames,
    fetchOnMount,
    defaultResponse: defaultResponses.itemsWithCount
  })

  return { loading, response, fetchData, error }
}

export default useSubjectsNames
