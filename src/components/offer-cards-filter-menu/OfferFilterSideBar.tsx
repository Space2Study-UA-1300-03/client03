import { Box, Typography } from '@mui/material'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import { styles } from '~/components/offer-cards-filter-menu/OfferCardsFilterMenu.styles'
import { useTranslation } from 'react-i18next'

const OfferFilterSideBar = () => {
  const { t } = useTranslation()
  return (
    <Box sx={styles.filter}>
      <FilterListOutlinedIcon sx={{ color: ' #455A64' }} />
      <Typography sx={styles.filterTitle}>
        {' '}
        {t('findOfferPage.filterMenu.filter')}{' '}
      </Typography>
    </Box>
  )
}
export default OfferFilterSideBar
