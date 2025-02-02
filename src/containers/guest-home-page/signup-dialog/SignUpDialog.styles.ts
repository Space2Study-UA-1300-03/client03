import { scrollbar } from '~/styles/app-theme/custom-scrollbar'

const style = {
  root: {
    maxWidth: '1128px',
    margin: '0 auto',
    marginBottom: '40px',
    mt: { xs: '56px', sm: 0 },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: { lg: '82px', md: '40px' },
    maxHeight: '800px'
  },
  imgContainer: {
    width: '472px',
    maxWidth: { md: '50%', lg: '472px' },
    display: { xs: 'none', md: 'flex' },
    pl: { lg: '96px', md: '30px' }
  },
  img: {
    objectFit: 'contain',
    width: '100%'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    maxHeight: 'inherit',
    padding: '0 90px',
    pt: { xs: '24px', sm: '64px' },
    pl: { xs: '8px', sm: '96px', md: '16px' },
    borderTop: { xs: '1px solid', sm: 'none' },
    borderColor: { xs: 'primary.100' }
  },
  title: {
    mb: '16px',
    fontSize: '40px',
    lineHeight: '48px',
    marginBottom: '25px',
    maxWidth: '400px'
  },
  form: {
    overflow: 'auto',
    maxWidth: { xs: '415px', md: '443px' },
    pt: '16px',
    pr: { xs: '8px', sm: '96px', md: '80px', lg: '96px' },
    pb: { xs: '24px', sm: '64px' },
    ...scrollbar
  }
}

export default style
