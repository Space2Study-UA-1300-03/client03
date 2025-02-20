import { Box, Typography } from '@mui/material'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import { styles } from '~/components/offer-cards-filter-menu/OfferCardsFilterMenu.styles'

const OfferFilterSideBar = () => {
  return (
    <Box sx={styles.filter}>
      <FilterListOutlinedIcon sx={{ color: ' #455A64' }} />
      <Typography sx={styles.filterTitle}> Filters </Typography>
    </Box>
  )
}
export default OfferFilterSideBar
