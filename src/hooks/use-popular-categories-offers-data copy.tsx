import { useEffect, useState } from 'react'
import { axiosClient } from '~/plugins/axiosClient'

interface CategoryOffer {
  categoryId: string
  offerCount: number
}

interface OfferResponse {
  limit: number
  data: CategoryOffer[]
}

const usePopularCategoriesOffersData = (limit: number) => {
  const [offersData, setOffersData] = useState<Record<string, number>>({})

  useEffect(() => {
    const fetchOffersData = async () => {
      try {
        const { data } = await axiosClient.get<OfferResponse>(
          '/offers/popular',
          { params: { limit } }
        )

        const results = data.data.reduce(
          (acc, category) => ({
            ...acc,
            [category.categoryId]: category.offerCount
          }),
          {}
        )

        setOffersData(results)
      } catch (error) {
        console.error('Failed to fetch popular offers:', error)
      }
    }

    void fetchOffersData()
  }, [limit])

  return offersData
}

export default usePopularCategoriesOffersData
