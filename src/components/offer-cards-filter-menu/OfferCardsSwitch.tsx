import { useState } from 'react'
import { Box } from '@mui/material'
import { styles } from '~/components/offer-cards-filter-menu/OfferCardsFilterMenu.styles'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import { TypographyVariantEnum } from '~/types'

const OfferCardsSwitch: React.FC = () => {
  const [isTutorOffer, setIsTutorOffer] = useState(false)
  const onChange = () => {
    setIsTutorOffer(!isTutorOffer)
  }
  const switchOptions = {
    left: {
      text: 'Tutors’ offers'
    },
    right: {
      text: 'Students’ requests'
    }
  }
  return (
    <Box sx={styles.switch}>
      <AppContentSwitcher
        active={isTutorOffer}
        onChange={onChange}
        styles={styles.switch}
        switchOptions={switchOptions}
        typographyVariant={TypographyVariantEnum.Body2}
      />
    </Box>
  )
}

export default OfferCardsSwitch
