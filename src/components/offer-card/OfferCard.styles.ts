import { border } from '~/pages/offer-details/OfferDetails.styles'

export const styles = {
  offerCard: {
    ...border,
    m: '16px',
    p: { sm: '20px 20px', md: '20px 30px' },
    display: 'flex',
    alignItems: 'flex-start',
    gap: '40px',
    flex: '1 0 0',
    alignSelf: 'stretch',
    minWidth: '600px',
    height: '360px',

    fontFamily: 'Rubik',
    fontStyle: 'normal',
    letterSpacing: '0.15px',
    lineHeight: '24px'
  },
  titleCard: {
    fontSize: '18px',
    fontWeight: '600',
    color: ' #455A64'
  },
  author: {
    fontSize: '16px',
    fontWeight: '500',
    color: ' #607D8B'
  },
  reviews: {
    color: '#607D8B',
    fontSize: '12px',
    fontWeight: '500'
  },
  description: {
    color: '#546E7A',
    fontSize: '14px'
  },
  authInfo: {
    p: '10px',
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2'
  },
  cardDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '10px',
    maxWidth: 'md'
  },
  buttonsCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    justifyContent: 'center',
    alignItems: 'center',
    maxwidth: '250px'
  },
  button: {
    p: '7px 24px',
    width: '180px',
    height: '56px'
  }
}
