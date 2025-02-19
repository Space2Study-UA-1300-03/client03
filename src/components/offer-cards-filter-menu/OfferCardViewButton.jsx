import { Box } from '@mui/material'
import AppButton from '../app-button/AppButton'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import { styles } from '~/components/offer-cards-filter-menu/OfferCardsFilterMenu.styles'

export default function OfferCardViewButton() {
  return (
    <Box sx={styles.viewButtons}>
      <AppButton variant='outlined'>
        {' '}
        <FilterListOutlinedIcon />{' '}
      </AppButton>
      <AppButton variant='outlined'>
        {' '}
        <GridViewOutlinedIcon />{' '}
      </AppButton>
    </Box>
  )
}
