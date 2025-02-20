export const style = {
  root: {
    backgroundColor: 'basic.white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    p: '50px 45px'
  },
  mainTitleWithDescription: {
    title: {
      typography: 'h4'
    },

    description: {
      typography: 'body1'
    }
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '40px',
    m: '48px 0 70px 0'
  },
  card: {
    maxWidth: '229px'
  },
  cardImg: {
    maxHeight: '64px'
  },
  cardTitleWithDescription: {
    wrapper: {
      mb: '32px'
    },
    title: {
      typography: 'h6',
      mt: '24px',
      mb: '16px'
    },
    description: {
      typography: 'body2'
    }
  }
}
