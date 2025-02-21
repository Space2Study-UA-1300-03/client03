import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'

import TitleWithDescription from '../title-with-description/TitleWithDescription'
// import CardsList from '../cards-list/CardsList'
// import CardWithLink from '../card-with-link/CardWithLink'
import { styles } from './PopularCategories.styles'

// import useBreakpoints from '~/hooks/use-breakpoints'
// import { authRoutes } from '~/router/constants/authRoutes'
import { categoryService } from '~/services/category-service'

const PopularCategories = () => {
  const { t } = useTranslation()
  // const breakpoints = useBreakpoints()
  // const navigate = useNavigate()

  const getCategoriesNames = useCallback(
    () =>
      categoryService
        .getCategoriesNames(1, 100)
        .then((response) => response.data),
    []
  )

  // const onClickButton = () => {
  //   navigate(authRoutes.categories.path)
  // }

  console.log(getCategoriesNames)

  // const cards = useMemo(
  //   () =>
  //     categories.map((item) => {
  //       return (
  //         <CardWithLink
  //           description={`${item.offers} ${t('categoriesPage.offers')}`}
  //           icon={item.appearance.icon}
  //           iconColor={item.appearance.color}
  //           key={item._id}
  //           link={`/categories/subjects?categoryId=${item._id}`}
  //           title={t(`categoriesNames.categories.${item.categoryName}`)}
  //         />
  //       )
  //     }),
  //   [sortedCategories, t]
  // )

  return (
    <Box>
      <TitleWithDescription
        description={t('tutorHomePage.popularCategories.description')}
        style={styles.titleWithDescription}
        title={t('tutorHomePage.popularCategories.title')}
      />

      {/* <CardsList
        btnText={t('tutorHomePage.popularCategories.viewAllCategories')}
        // cards={cards}
        // loading={loadingCategories}
        onClick={onClickButton}
      /> */}
    </Box>
  )
}

export default PopularCategories
