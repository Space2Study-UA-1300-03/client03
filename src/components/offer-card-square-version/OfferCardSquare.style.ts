import { border } from '~/pages/offer-details/OfferDetails.styles'

export const styles = {
  offerCardSquare: {
    ...border,
    m: '16px',
    p: { sm: '20px 20px', md: '20px 30px' },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '20px',
    flex: '1 0 0',
    alignSelf: 'stretch',
    minHeight: '420px',
    width: 'auto',
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    letterSpacing: '0.15px',
    lineHeight: '24px'
  },
  titleCard: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#455A64',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis'
  },

  author: {
    mb: '10px',
    fontSize: '16px',
    fontWeight: '500',
    color: '#607D8B'
  },
  reviews: {
    color: '#607D8B',
    fontSize: '12px',
    fontWeight: '500'
  },
  authInfo: {
    p: '10px',
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifycontent: 'center',
    gap: '20px'
  },
  buttonsCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  button: {
    p: '7px 24px',
    width: '100%',
    height: '40px'
  },
  chipItemsTitle: {
    fontSize: '10px',
    fontWeight: '400',
    color: '#607D8B',
    textTransform: 'uppercase',
    letterSpacing: 1.5
  },
  chipItems: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    alignItems: 'center'
  },
  ratingAmount: {
    fontSize: '20px',
    fontWeight: '400',
    justifyContent: 'center'
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
}
