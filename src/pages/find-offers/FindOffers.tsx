import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import useLoadMore from '~/hooks/use-load-more'
import useBreakpoints from '~/hooks/use-breakpoints'

import Box from '@mui/material/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import ListOfferCard from '~/components/offer-cards-list/ListOfferCards'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

import { subjectService } from '~/services/subject-service'
import { categoryService } from '~/services/category-service'
import { getScreenBasedLimit } from '~/utils/helper-functions'
import { offerService } from '~/services/offer-service'

import {
  CategoryNameInterface,
  SizeEnum,
  SubjectNameInterface,
  Offer
} from '~/types'
import { itemsLoadLimit } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from './FindOffers.styles'

const FindOffers = () => {
  const { t } = useTranslation()
  const breakpoints = useBreakpoints()
  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const [searchParams, setSearchParams] = useSearchParams()
  const [match, setMatch] = useState<string>('')
  const categoryId = searchParams.get('categoryId') ?? ''
  const subjectId = searchParams.get('subjectId') ?? ''
  const params = useMemo(
    () => ({ search: match, categoryId, subjectId }),
    [match, categoryId, subjectId]
  )

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
      textFieldProps={{
        label: t('breadCrumbs.categories')
      }}
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
      textFieldProps={{
        label: t('breadCrumbs.subjects')
      }}
      value={subjectId}
      valueField='_id'
    />
  )

  const getOffers = useCallback(
    (
      data?: Pick<Offer, 'search'> & { categoryId?: string; subjectId?: string }
    ) => offerService.getOffer(data?.search, data?.categoryId, data?.subjectId),
    []
  )

  const {
    // data: offers,
    // loading: offersLoading,
    resetData
    // loadMore,
    // isExpandable
  } = useLoadMore<Offer, Pick<Offer, 'search'>>({
    service: getOffers,
    limit: cardsLimit,
    params
  })

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
            // loading={}
            // onFocus={}
            onSearchChange={resetData}
            options={[]}
            search={match}
            setSearch={setMatch}
            textFieldProps={{
              label: t('findOffers.searchToolbar.label')
            }}
          />
        )}
      </AppToolbar>
      <ListOfferCard />
    </PageWrapper>
  )
}

export default FindOffers
