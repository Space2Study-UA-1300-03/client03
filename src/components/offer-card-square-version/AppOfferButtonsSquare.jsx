import AppButton from '~/components/app-button/AppButton'
import { Box } from '@mui/material'
import { styles } from '~/components/offer-card-square-version/OfferCardSquare.style'

const AppOfferButtonsSquare = () => {
  return (
    <Box sx={styles.buttonsCard}>
      <AppButton sx={styles.button}>Show Details</AppButton>
      <AppButton sx={styles.button} variant='outlined'>
        Send message
      </AppButton>
    </Box>
  )
}

export default AppOfferButtonsSquare
