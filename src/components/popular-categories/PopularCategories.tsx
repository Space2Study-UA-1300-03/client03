import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import useAxios from '~/hooks/use-axios'
import usePopularCategoriesOffersData from '~/hooks/use-popular-categories-offers-data'

import Box from '@mui/material/Box'

import TitleWithDescription from '../title-with-description/TitleWithDescription'
import CardsList from '../cards-list/CardsList'
import CardWithLink from '../card-with-link/CardWithLink'

import { styles } from './PopularCategories.styles'
import { authRoutes } from '~/router/constants/authRoutes'
import { categoryService } from '~/services/category-service'
import { CategoryInterface } from '~/types'

const PopularCategories = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const getCategoriesService = useMemo(
    () => () => categoryService.getCategories({ limit: 1000 }),
    []
  )

  const { response: categories, loading: categoriesLoading } = useAxios({
    service: getCategoriesService,
    defaultResponse: { data: [], pagination: { totalItems: 0 } },
    fetchOnMount: true
  })

  const offersData = usePopularCategoriesOffersData(10)

  const onClickButton = () => {
    navigate(authRoutes.categories.path)
  }

  const cards = useMemo(() => {
    return (categories.data as CategoryInterface[])
      .filter((item) => offersData[item._id])
      .sort((a, b) => offersData[b._id] - offersData[a._id])
      .map((item) => (
        <CardWithLink
          description={`${offersData[item._id] ?? 0} ${t('categoriesPage.offers')}`}
          icon={item.appearance.icon}
          iconColor={item.appearance.color}
          key={item._id}
          link={`/categories/subjects?categoryId=${item._id}`}
          title={t(`categoriesNames.categories.${item.categoryName}`)}
        />
      ))
  }, [categories, offersData, t])

  return (
    <Box sx={styles.container}>
      <TitleWithDescription
        description={t('tutorHomePage.popularCategories.description')}
        style={styles.titleWithDescription}
        title={t('tutorHomePage.popularCategories.title')}
      />

      <CardsList
        btnText={t('tutorHomePage.popularCategories.viewAllCategories')}
        cards={cards.slice(0, 8)}
        loading={categoriesLoading}
        onClick={onClickButton}
      />
    </Box>
  )
}

export default PopularCategories
