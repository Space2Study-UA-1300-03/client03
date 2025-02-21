import { alpha } from '@mui/material/styles'

export const styles = {
  offerCard: {
    margin: '16px',
    padding: { sm: '20px 20px', md: '20px 30px' },
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '24px',
    minWidth: '1128px',
    maxWidth: '1128px',
    height: '290px',
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    letterSpacing: '0.15px',
    lineHeight: '24px',
    borderRadius: '6px',
    backgroundColor: '#fff',
    transition: 'box-shadow 0.3s ease, transform 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: `0px 3px 15px ${alpha('#90A4AE8F', 0.5)}`
    }
  },
  authInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 1,
    width: '160px',
    padding: '10px'
  },
  cardDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: '10px',
    flex: '1 1 auto'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '180px'
  },
  titleCard: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#455A64'
  },
  author: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#607D8B'
  },
  reviews: {
    color: '#607D8B',
    fontSize: '12px',
    fontWeight: '500'
  },
  description: {
    color: '#546E7A',
    fontSize: '14px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical'
  },
  priceValue: {
    fontSize: '20px',
    fontWeight: '500',
    textTransform: 'uppercase'
  },
  priceUnit: {
    fontSize: '10px',
    fontWeight: '400',
    textTransform: 'uppercase'
  },
  buttonArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '24px'
  },
  buttonsCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    p: '7px 24px',
    width: '200px',
    height: '56px'
  }
}
