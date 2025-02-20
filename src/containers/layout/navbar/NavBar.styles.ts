import { TypographyVariantEnum } from '~/types'

const navItem = {
  typography: TypographyVariantEnum.Subtitle2,
  whiteSpace: 'nowrap',
  color: 'primary.900',
  cursor: 'pointer',
  '&:hover': { color: 'primary.500' }
}

export const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    p: 0,
    margin: { xs: 0, xl: 'auto' },
    maxWidth: '1800px',
    width: { xl: '100%' }
  },
  logoButton: {
    m: { xs: '10px', sm: '18px', md: '22px 6px 22px 24px', lg: '22px 24px' }
  },
  navList: {
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center'
  },
  menuItem: { p: '0' },
  menuLink: { p: '5px 16px' },
  listItem: { py: '5px', cursor: 'pointer' },
  navItemText: (isActive = false) => ({
    ...navItem,
    width: '100%',
    textDecoration: isActive ? 'underline' : 'none',
    '&:focus': { textDecoration: 'underline' }
  }),
  findOfferMenuItem: {
    ...navItem,
    p: '8px 14px'
  },
  arrowIcon: (open: boolean) => ({
    width: '18px',
    height: '18px',
    ml: '2px',
    color: 'primary.900',
    transform: `rotate(${open ? 180 : 0}deg)`
  }),
  divider: {
    color: 'primary.900',
    fontWeight: '500',
    px: '4px'
  }
}
