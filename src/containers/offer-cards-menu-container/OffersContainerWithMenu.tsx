import { Box } from '@mui/material'
import OfferCardsFilterMenu from '~/components/offer-cards-filter-menu/OfferCardsFilterMenu'
import ListOfferCard from '~/components/offer-cards-list/ListOfferCards'

const OffersContainerWithMenu = () => {
  return (
    <Box>
      <OfferCardsFilterMenu />
      <ListOfferCard />
    </Box>
  )
}

export default OffersContainerWithMenu
