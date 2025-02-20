import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0px' },
    ...fadeAnimation
  },
  imgContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'flex-start',
    maxWidth: '440px',
    aspectRatio: { xs: '4/3', sm: 'auto' },
    p: { lg: '0 120px 50px 0', md: '0 60px 50px 0', xs: '15px 0' }
  },
  img: {
    width: '100%',
    m: { sm: 0, xs: '0 auto' }
  },
  rightBox: {
    maxWidth: '432px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    m: { md: 0, xs: '0 auto' },
    pt: 0
  },
  contentBox: { mb: { xs: '30px', sm: '0' } }
}
