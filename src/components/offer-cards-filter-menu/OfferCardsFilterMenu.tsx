import { Container } from '@mui/material'
import OfferFilterSideBar from './OfferFilterSideBar'
import OfferCardsSwitch from './OfferCardsSwitch'
import OfferCardViewButton from './OfferCardViewButton'
import { styles } from '~/components/offer-cards-filter-menu/OfferCardsFilterMenu.styles'

const OfferCardsFilterMenu = () => {
  return (
    <Container sx={styles.container}>
      <OfferFilterSideBar />
      <OfferCardsSwitch />
      <OfferCardViewButton />
    </Container>
  )
}
export default OfferCardsFilterMenu
