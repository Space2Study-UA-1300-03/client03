import { useState } from 'react'
import { Box } from '@mui/material'

import OfferCardsFilterMenu from '~/components/offer-cards-filter-menu/OfferCardsFilterMenu'
import ListOfferCard from '~/components/offer-cards-list/ListOfferCards'

const OffersContainerWithMenu = () => {
  const [cardView, setCardView] = useState<'grid' | 'single'>('single')

  return (
    <Box>
      <OfferCardsFilterMenu cardView={cardView} setCardView={setCardView} />
      <ListOfferCard cardView={cardView} />
    </Box>
  )
}

export default OffersContainerWithMenu
