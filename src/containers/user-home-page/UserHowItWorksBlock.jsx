import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

const UserHowItWorksBlock = ({ image, title, description, style, key }) => {
  const { t } = useTranslation()

  return (
    <Box key={key} style={style.card}>
      <Box alt={t(title)} component='img' src={image} sx={style.cardImg} />
      <TitleWithDescription
        description={t(description)}
        style={style.cardTitleWithDescription}
        title={t(title)}
      />
    </Box>
  )
}

export default UserHowItWorksBlock
