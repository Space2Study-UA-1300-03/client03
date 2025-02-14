import { FC } from 'react'
import Box from '@mui/material/Box'
import Icon from '@mui/material/Icon'

import AppCard from '~/components/app-card/AppCard'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { styles } from '~/components/card-with-link/CardWithLink.styles'

interface CardWithLinkProps {
  title: string
  description: string
  link: string
  icon: string
  iconColor: string
}

const CardWithLink: FC<CardWithLinkProps> = ({
  title,
  description,
  link,
  icon,
  iconColor
}) => {
  return (
    <AppCard link={link} sx={styles.card}>
      <Box sx={styles.iconContainer(iconColor)}>
        <Icon sx={styles.icon(iconColor)}>{icon}</Icon>
      </Box>
      <TitleWithDescription
        description={description}
        style={styles.titleWithDescription}
        title={title}
      />
    </AppCard>
  )
}

export default CardWithLink
