import AppButton from '~/components/app-button/AppButton'
import { Box } from '@mui/material'
import { styles } from '~/components/offer-card-square-version/OfferCardSquare.style'
import { useTranslation } from 'react-i18next'

const AppOfferButtonsSquare = () => {
  const { t } = useTranslation()
  return (
    <Box sx={styles.buttonsCard}>
      <AppButton sx={styles.button}>
        {t('findOfferPage.cardButtons.showDetails')}
      </AppButton>
      <AppButton sx={styles.button} variant='outlined'>
        {t('findOfferPage.cardButtons.sendMessage')}
      </AppButton>
    </Box>
  )
}

export default AppOfferButtonsSquare
