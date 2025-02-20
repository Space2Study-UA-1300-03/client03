import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { useAppSelector } from '~/hooks/use-redux'
import useLoadMore from '~/hooks/use-load-more'
import useSubjectsNames from '~/hooks/use-subjects-names'
import { subjectService } from '~/services/subject-service'
import { categoryService } from '~/services/category-service'
import { useModalContext } from '~/context/modal-context'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import CardsList from '~/components/cards-list/CardsList'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import DirectionLink from '~/components/direction-link/DirectionLink'
import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import useBreakpoints from '~/hooks/use-breakpoints'
import { getOpositeRole, getScreenBasedLimit } from '~/utils/helper-functions'

import {
  CategoryNameInterface,
  SizeEnum,
  SubjectInterface,
  SubjectNameInterface
} from '~/types'
import { itemsLoadLimit } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/pages/subjects/Subjects.styles'

const Subjects = () => {
  const [match, setMatch] = useState<string>('')
  const [categoryName, setCategoryName] = useState<string>('')
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const params = useMemo(() => ({ name: match }), [match])

  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const breakpoints = useBreakpoints()
  const { openModal } = useModalContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('categoryId') ?? ''

  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const {
    loading: subjectNamesLoading,
    response: subjectsNames,
    fetchData
  } = useSubjectsNames({
    fetchOnMount: false,
    category: categoryId,
    page: 1,
    limit: 100
  })

  const subjectsNamesItems = subjectsNames.data.map(
    (item: SubjectNameInterface) => item.subjectName
  )

  const getSubjectNames = () => {
    !isFetched && void fetchData()
    setIsFetched(true)
  }

  const getSubjects = useCallback(
    (data?: Pick<SubjectInterface, 'name'>) =>
      subjectService.getSubjects(data, categoryId),
    [categoryId]
  )

  const {
    data: subjects,
    loading: subjectsLoading,
    resetData,
    loadMore,
    isExpandable
  } = useLoadMore<SubjectInterface, Pick<SubjectInterface, 'name'>>({
    service: getSubjects,
    limit: cardsLimit,
    params
  })

  const oppositeRole = getOpositeRole(userRole)

  const cards = useMemo(
    () =>
      subjects.map((item: SubjectInterface) => {
        return (
          <CardWithLink
            // description={`${item.totalOffers[oppositeRole]} ${t(
            //   'categoriesPage.offers'
            // )}`}
            description={`123 ${t('categoriesPage.offers')}`}
            icon={item.appearance.icon}
            iconColor={item.appearance.color}
            key={item._id}
            link={`${authRoutes.categories.path}?categoryId=${categoryId}&subjectId=${item._id}`}
            title={t(`subjectsNames.subjects.${item.subjectName}`)}
          />
        )
      }),
    [subjects, categoryId, oppositeRole, t]
  )

  const getCategoriesNames = useCallback(
    () =>
      categoryService
        .getCategoriesNames(1, 100)
        .then((response) => response.data),
    []
  )

  const onCategoryChange = (
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    setIsFetched(false)
    searchParams.set('categoryId', value?._id ?? '')
    setCategoryName(value?.categoryName ?? '')
    setSearchParams(searchParams)
    resetData()
  }

  const onResponseCategory = (response: CategoryNameInterface[]) => {
    const category = response.find((option) => option._id === categoryId)
    setCategoryName(category?.categoryName ?? '')
  }

  const autoCompleteCategories = (
    <AsyncAutocomplete
      axiosProps={{ onResponse: onResponseCategory }}
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

  const handleOpenModal = () => openModal({ component: <CreateSubjectModal /> })

  return (
    <PageWrapper>
      <OfferRequestBlock />

      <TitleWithDescription
        description={t('subjectsPage.subjects.description')}
        style={styles.titleWithDescription}
        title={t('subjectsPage.subjects.title', {
          category: categoryName
            ? t(`categoriesNames.categories.${categoryName}`)
            : categoryName
        })}
      />

      <Box sx={styles.navigation}>
        <DirectionLink
          before={<ArrowBackIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.categories.path}
          title={t('subjectsPage.subjects.backToAllCategories')}
        />
        <DirectionLink
          after={<ArrowForwardIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.findOffers.path}
          title={t('subjectsPage.subjects.showAllOffers')}
        />
      </Box>
      <AppToolbar sx={styles.searchToolbar}>
        {!breakpoints.isMobile && autoCompleteCategories}
        <SearchAutocomplete
          loading={subjectNamesLoading}
          onFocus={getSubjectNames}
          onSearchChange={resetData}
          options={subjectsNamesItems}
          search={match}
          setSearch={setMatch}
          textFieldProps={{
            label: t('subjectsPage.subjects.searchLabel')
          }}
        />
      </AppToolbar>
      {breakpoints.isMobile && autoCompleteCategories}
      {!subjects.length && !subjectsLoading ? (
        <NotFoundResults
          buttonText={t('errorMessages.buttonRequest', { name: 'subjects' })}
          description={t('errorMessages.tryAgainText', { name: 'subjects' })}
          onClick={handleOpenModal}
        />
      ) : (
        <CardsList
          btnText={t('categoriesPage.viewMore')}
          cards={cards}
          isExpandable={isExpandable}
          loading={subjectsLoading}
          onClick={loadMore}
        />
      )}
    </PageWrapper>
  )
}

export default Subjects
