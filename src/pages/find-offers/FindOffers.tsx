import PageWrapper from '~/components/page-wrapper/PageWrapper'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import OffersContainerWithMenu from '~/containers/offer-cards-menu-container/OffersContainerWithMenu'

const FindOffers = () => {
  return (
    <PageWrapper>
      <OfferRequestBlock />
      <OffersContainerWithMenu />
    </PageWrapper>
  )
}

export default FindOffers
