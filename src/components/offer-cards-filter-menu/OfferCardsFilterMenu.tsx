import { Container } from '@mui/material'

import OfferFilterSideBar from './OfferFilterSideBar'
import OfferCardsSwitch from './OfferCardsSwitch'
import OfferCardViewButton from './OfferCardViewButton'
import { styles } from '~/components/offer-cards-filter-menu/OfferCardsFilterMenu.styles'

interface OfferCardsFilterMenuProps {
  setCardView: (view: 'grid' | 'single') => void
  cardView: 'grid' | 'single'
}

const OfferCardsFilterMenu: React.FC<OfferCardsFilterMenuProps> = ({
  setCardView,
  cardView
}) => {
  return (
    <Container sx={styles.container}>
      <OfferFilterSideBar />
      <OfferCardsSwitch />
      <OfferCardViewButton cardView={cardView} setCardView={setCardView} />
    </Container>
  )
}
export default OfferCardsFilterMenu
