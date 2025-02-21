import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import useBreakpoints from '~/hooks/use-breakpoints'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import ListOfferCard from '~/components/offer-cards-list/ListOfferCards'

import OfferCardsSwitch from '~/components/offer-cards-filter-menu/OfferCardsSwitch'
import OfferCardViewButton from '~/components/offer-cards-filter-menu/OfferCardViewButton'

import { subjectService } from '~/services/subject-service'
import { categoryService } from '~/services/category-service'
import { CategoryNameInterface, SizeEnum, SubjectNameInterface } from '~/types'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from './FindOffers.styles'
import PopularCategories from '~/components/popular-categories/PopularCategories'

const FindOffers = () => {
  const { t } = useTranslation()
  const breakpoints = useBreakpoints()

  const [searchParams, setSearchParams] = useSearchParams()
  const [match, setMatch] = useState<string>('')

  const [cardView, setCardView] = useState<'grid' | 'single'>('grid')

  const categoryId = searchParams.get('categoryId') ?? ''
  const subjectId = searchParams.get('subjectId') ?? ''

  const onCategoryChange = (
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    if (value?._id) {
      searchParams.set('categoryId', value._id)
    } else {
      searchParams.delete('categoryId')
    }
    searchParams.delete('subjectId')
    setSearchParams(searchParams)
  }

  const onSubjectChange = (
    _: React.SyntheticEvent,
    value: SubjectNameInterface | null
  ) => {
    searchParams.set('subjectId', value?._id ?? '')
    setSearchParams(searchParams)
  }

  const getCategoriesNames = useCallback(
    () =>
      categoryService
        .getCategoriesNames(1, 100)
        .then((response) => response.data),
    []
  )

  const getSubjectsName = useCallback(
    () =>
      subjectService
        .getSubjectsNames(categoryId, 1, 100)
        .then((response) => response.data),
    [categoryId]
  )

  const autoCompleteCategories = (
    <AsyncAutocomplete
      labelField='categoryName'
      onChange={onCategoryChange}
      service={getCategoriesNames}
      sx={styles.categoryInput}
      textFieldProps={{ label: t('breadCrumbs.categories') }}
      value={categoryId}
      valueField='_id'
    />
  )

  const autoCompleteSubjects = (
    <AsyncAutocomplete
      labelField='subjectName'
      onChange={onSubjectChange}
      service={getSubjectsName}
      sx={styles.categoryInput}
      textFieldProps={{ label: t('breadCrumbs.subjects') }}
      value={subjectId}
      valueField='_id'
    />
  )

  return (
    <PageWrapper>
      <OfferRequestBlock />

      <TitleWithDescription
        description={t('findOffers.titleWithDescription.description')}
        style={styles.titleWithDescription}
        title={t('findOffers.titleWithDescription.title')}
      />

      <Box sx={styles.navigation}>
        <DirectionLink
          before={<ArrowBackIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.categories.path}
          title={t('findOffers.backToAllCategories')}
        />
      </Box>
      <AppToolbar sx={styles.searchToolbar}>
        {autoCompleteCategories}
        {autoCompleteSubjects}
        {!breakpoints.isMobile && (
          <SearchAutocomplete
            onSearchChange={(newSearch: string) => setMatch(newSearch)}
            options={[]}
            search={match}
            setSearch={setMatch}
            textFieldProps={{ label: t('findOffers.searchToolbar.label') }}
          />
        )}
        <OfferCardViewButton cardView={cardView} setCardView={setCardView} />
      </AppToolbar>
      <OfferCardsSwitch />
      <ListOfferCard
        cardView={cardView}
        categoryId={categoryId}
        search={match}
        subjectId={subjectId}
      />
      <PopularCategories />
    </PageWrapper>
  )
}

export default FindOffers
