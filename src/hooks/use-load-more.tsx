import { useState, useMemo, useLayoutEffect, useCallback } from 'react'

import useAxios from '~/hooks/use-axios'

import { defaultResponses } from '~/constants'
import { ServiceFunction, ItemsWithCount } from '~/types'

interface UseLoadMoreProps<Data, Params> {
  service: ServiceFunction<ItemsWithCount<Data>, Params>
  limit: number
  params?: Params
}

const useLoadMore = <Data, Params>({
  service,
  limit,
  params
}: UseLoadMoreProps<Data, Params>) => {
  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<Data[]>([])
  const [previousLimit, setPreviousLimit] = useState<number>(limit)
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)

  let isFetched = false

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1)
    }
  }, [hasNextPage])

  const handleResponse = useCallback((responseData: ItemsWithCount<Data>) => {
    setData((prevState) => [...prevState, ...responseData.data])
    setHasNextPage(responseData.pagination?.hasNextPage ?? false)
  }, [])

  const resetData = useCallback(() => {
    setPage(1)
    setData([])
    setHasNextPage(true)
  }, [])

  const { response, loading, fetchData } = useAxios<
    ItemsWithCount<Data>,
    Params
  >({
    service,
    defaultResponse: defaultResponses.itemsWithCount,
    fetchOnMount: false,
    onResponse: handleResponse
  })

  useLayoutEffect(() => {
    if (previousLimit === limit && !isFetched) {
      void fetchData({ ...params, limit, page } as Params)
    } else {
      resetData()
      setPreviousLimit(limit)
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isFetched = true
    }
  }, [fetchData, limit, previousLimit, resetData, page, params])

  const isExpandable = useMemo(() => hasNextPage, [hasNextPage])

  console.log(response, 'response')

  return {
    data,
    loading,
    resetData,
    loadMore,
    isExpandable
  }
}

export default useLoadMore
