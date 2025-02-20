import { Typography, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { TypographyVariantEnum } from '~/types'

const OfferTitle = () => {
  const { t } = useTranslation()
  return (
    <Box sx={{ m: '40px 0' }}>
      <Typography variant={TypographyVariantEnum.H4}>
        {t('findOfferPage.titleWithDescription.title')}
      </Typography>
      <Typography variant={TypographyVariantEnum.Body1}>
        {t('findOfferPage.titleWithDescription.description')}
      </Typography>
    </Box>
  )
}
export default OfferTitle
