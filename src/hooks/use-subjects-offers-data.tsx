import { useEffect, useState } from 'react'
import { axiosClient } from '~/plugins/axiosClient'
import { SubjectInterface } from '~/types'

interface OfferResponse {
  pagination: {
    totalItems: number
  }
}

const useSubjectsOffersData = (subjects: SubjectInterface[]) => {
  const [offersData, setOffersData] = useState<Record<string, number>>({})

  useEffect(() => {
    const fetchOffersData = async () => {
      try {
        const results: Record<string, number> = {}

        await Promise.all(
          subjects.map(async (item) => {
            try {
              const { data } = await axiosClient.get<OfferResponse>('/offers', {
                params: { subjectId: item._id }
              })
              results[item._id] = data?.pagination?.totalItems ?? 0
            } catch (err) {
              console.error(
                `Failed to fetch offers for subjectId ${item._id}:`,
                err
              )
              results[item._id] = 0
            }
          })
        )

        setOffersData(results)
      } catch (error) {
        console.error('Failed to fetch all offers:', error)
      }
    }

    if (subjects.length) {
      void fetchOffersData()
    }
  }, [subjects])

  return offersData
}

export default useSubjectsOffersData
