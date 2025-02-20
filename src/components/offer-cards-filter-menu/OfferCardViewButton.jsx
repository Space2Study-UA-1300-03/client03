import { Box } from '@mui/material'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'

import AppButton from '../app-button/AppButton'

import { styles } from '~/components/offer-cards-filter-menu/OfferCardsFilterMenu.styles'

export default function OfferCardViewButton({ setCardView, cardView }) {
  return (
    <Box sx={styles.viewButtons}>
      <AppButton
        onClick={() => setCardView('single')}
        sx={{ borderColыor: cardView === 'single' ? 'black' : 'default' }}
        variant='outlined'
      >
        <FilterListOutlinedIcon />
      </AppButton>
      <AppButton
        onClick={() => setCardView('grid')}
        sx={{ borderColor: cardView === 'grid' ? 'black' : 'default' }}
        variant='outlined'
      >
        <GridViewOutlinedIcon />
      </AppButton>
    </Box>
  )
}
