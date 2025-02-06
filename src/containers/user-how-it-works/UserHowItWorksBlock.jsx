import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

const UserHowItWorksBlock = ({ image, title, description, style }) => {
  const { t } = useTranslation()

  return (
    <Box style={style.card}>
      <Box alt={title} component='img' src={image} sx={style.cardImg} />
      <TitleWithDescription
        description={t(description)}
        style={style.cardTitleWithDescription}
        title={t(title)}
      />
    </Box>
  )
}

export default UserHowItWorksBlock
