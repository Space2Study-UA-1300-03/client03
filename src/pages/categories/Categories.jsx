import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'

import { Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import useBreakpoints from '~/hooks/use-breakpoints'
import useCategoriesNames from '~/hooks/use-categories-names'
import useLoadMore from '~/hooks/use-load-more'
import { useModalContext } from '~/context/modal-context'
import { categoryService } from '~/services/category-service'
import { getScreenBasedLimit } from '~/utils/helper-functions'

import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import CardsList from '~/components/cards-list/CardsList'

import { SizeEnum } from '~/types'
import { itemsLoadLimit } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/pages/categories/Categories.styles'

const Categories = () => {
  const [match, setMatch] = useState('')
  const params = useMemo(() => ({ name: match }), [match])

  const { t } = useTranslation()
  const breakpoints = useBreakpoints()
  const { openModal } = useModalContext()

  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const getCategories = useCallback(
    (data) => categoryService.getCategories(data),
    []
  )

  const {
    loading: categoryNamesLoading,
    response: categoryNames,
    fetchData
  } = useCategoriesNames({ page: 1, limit: 1000, fetchOnMount: false })

  const {
    data: categories,
    loading: categoriesLoading,
    resetData,
    loadMore,
    isExpandable
  } = useLoadMore({
    service: getCategories,
    limit: cardsLimit,
    params
  })

  const getCategoryNames = () => !categoryNames.length && void fetchData()

  console.log(categoryNames, 'categoryNames')

  const cards = useMemo(
    () =>
      categories.map((item) => {
        return (
          <CardWithLink
            description={`${Math.round(Math.random() * 100)} ${t('categoriesPage.offers')}`}
            icon={item.appearance.icon}
            iconColor={item.appearance.color}
            key={item._id}
            link={`subjects?categoryId=${item._id}`}
            title={t(`categoriesNames.categories.${item.categoryName}`)}
          />
        )
      }),
    [categories, t]
  )

  const options = useMemo(
    () =>
      categoryNames.data.map((option) =>
        t(`categoriesNames.categories.${option.categoryName}`)
      ),
    [categoryNames, t]
  )

  const handleOpenModal = () => openModal({ component: <CreateSubjectModal /> })

  return (
    <PageWrapper>
      <OfferRequestBlock />

      <TitleWithDescription
        description={t('categoriesPage.description')}
        style={styles.titleWithDescription}
        title={t('categoriesPage.title')}
      />

      <DirectionLink
        after={<ArrowForwardIcon fontSize={SizeEnum.Small} />}
        linkTo={authRoutes.findOffers.path}
        title={t('categoriesPage.showAllOffers')}
      />

      <AppToolbar sx={styles.searchToolbar}>
        <SearchAutocomplete
          loading={categoryNamesLoading}
          onFocus={getCategoryNames}
          onSearchChange={resetData}
          options={options}
          search={match}
          setSearch={setMatch}
          textFieldProps={{
            label: t('categoriesPage.searchLabel')
          }}
        />
      </AppToolbar>

      <Typography sx={styles.createNewSubjectOrCategory}>
        <Trans i18nKey='categoriesPage.createNewSubjectOrCategory'>
          Can&apos;t find what you&apos;re looking for? Request a new
          <Link onClick={handleOpenModal} style={styles.link}>
            category
          </Link>
          or
          <Link onClick={handleOpenModal} style={styles.link}>
            subject
          </Link>
          !
        </Trans>
      </Typography>
      {!categories.length && !categoriesLoading ? (
        <NotFoundResults
          buttonText={t('errorMessages.buttonRequest', { name: 'category' })}
          description={t('errorMessages.tryAgainText', { name: 'category' })}
          onClick={handleOpenModal}
        />
      ) : (
        <CardsList
          btnText={t('categoriesPage.viewMore')}
          cards={cards}
          isExpandable={isExpandable}
          loading={categoriesLoading}
          onClick={loadMore}
        />
      )}
    </PageWrapper>
  )
}

export default Categories
