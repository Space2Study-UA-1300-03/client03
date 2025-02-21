import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { axiosClient } from '~/plugins/axiosClient'
import { useTranslation } from 'react-i18next'

import OfferCard from '../offer-card/OfferCard'
import OfferCardSquare from '../offer-card-square-version/OfferCardSquare'
import PaginationBar from '~/components/pagination-bar/PaginationBar'
import { styles } from '~/components/offer-cards-list/ListOfferCards.style'

interface IOffer {
  id: string
  aboutAuthor: {
    author: {
      _id: string
      firstName: string
      email: string
      role: string[]
    } | null
    authorRole: string
  }
  aboutInterests: {
    categoryInfo: {
      _id: string
      categoryName: string
      appearance: { icon: string; color: string }
    }
    subjectInfo: {
      _id: string
      subjectName: string
      appearance: { icon: string; color: string }
    }
  }
  title: string
  description: string
  price: number
  proficiencyLevel: string
  languages: string[]
  status: string
  FAQ: Array<{ question: string; answer: string }>
  createdAt: string
  updatedAt: string
}

interface ListOfferCardProps {
  cardView: 'grid' | 'single'
  categoryId?: string
  subjectId?: string
  search?: string
}

const ListOfferCard: React.FC<ListOfferCardProps> = ({
  cardView,
  categoryId,
  subjectId,
  search
}) => {
  const { t } = useTranslation()
  const [offers, setOffers] = useState<IOffer[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const limit = 6

  const fetchOffers = async (currentPage: number) => {
    try {
      setLoading(true)
      const response = await axiosClient.get('/offers', {
        params: {
          page: currentPage,
          limit,
          categoryId,
          subjectId,
          search
        }
      })

      const { pagination, data } = response.data
      console.log('DATA FROM SERVER:', data)
      setOffers(data)
      setTotalPages(pagination?.totalPages || 1)
    } catch (error) {
      console.error('Error fetching offers:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(1)
  }, [categoryId, subjectId, search])

  useEffect(() => {
    void fetchOffers(page)
  }, [page, categoryId, subjectId, search])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <Box sx={styles.wrapper}>
      {!loading && offers.length === 0 ? (
        <Typography sx={{ textAlign: 'center', marginTop: 20 }} variant='h6'>
          {t('offerPage.createOffer.findOffers.noResults')}
        </Typography>
      ) : (
        <Box
          sx={
            cardView === 'grid'
              ? styles.gridCardWrapper
              : styles.singleCardWrapper
          }
        >
          {offers.map((offer) => {
            const {
              id,
              aboutAuthor,
              aboutInterests,
              title,
              description,
              price,
              proficiencyLevel,
              languages
            } = offer

            const authorName = aboutAuthor.author?.firstName || 'Unknown'
            const subjects = aboutInterests.subjectInfo
              ? [aboutInterests.subjectInfo.subjectName]
              : []
            const levelArray = Array.isArray(proficiencyLevel)
              ? proficiencyLevel
              : [proficiencyLevel]

            const cardData = {
              author: authorName,
              avatar: '',
              description,
              languages,
              price,
              proficiencyLevel: levelArray,
              reviews: 0,
              subjects,
              title
            }

            return (
              <Box key={id} sx={{ mb: 2 }}>
                {cardView === 'grid' ? (
                  <OfferCardSquare cardData={cardData} />
                ) : (
                  <OfferCard cardData={cardData} />
                )}
              </Box>
            )
          })}
        </Box>
      )}
      <Box sx={styles.paginationContainer}>
        <PaginationBar
          currentPage={page}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      </Box>
    </Box>
  )
}

export default ListOfferCard
