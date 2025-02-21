import { alpha } from '@mui/material/styles'

export const styles = {
  card: {
    p: { xs: '20px 30px', lg: '25px 33px' },
    borderRadius: '6px',
    gap: '24px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease, transform 0.2s ease',
    '&:hover': {
      boxShadow: `0px 3px 15px ${alpha('#90A4AE8F', 0.5)}`
    }
  },
  titleWithDescription: {
    wrapper: {
      minWidth: '110px',
      margin: 0,
      mb: 0,
      lineHeight: '24px',
      textAlign: 'start'
    },
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'basic.black',
      typography: { xs: 'h6' },
      m: 0
    },
    description: {
      typography: { xs: 'body2' },
      color: 'primary.500'
    }
  },
  iconContainer: (bgColor: string) => ({
    minWidth: '62px',
    height: '62px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: alpha(bgColor, 0.2)
  }),
  icon: (color: string) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    color: color
  })
}
