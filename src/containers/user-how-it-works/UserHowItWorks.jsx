import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Box, Button } from '@mui/material'

import { studentHowItWorksCards } from './StudentHowItWorksCards'
import { tutorHowItWorksCards } from './TutorHowItWorksCards'
import { authRoutes } from '~/router/constants/authRoutes'
import { style } from './UserHowItWorks.styles'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import HowItWorksBlock from './UserHowItWorksBlock'
import { ButtonVariantEnum, SizeEnum } from '~/types'
import { guestRoutes } from '~/router/constants/guestRoutes'

const UserHowItWorks = ({ userRole }) => {
  const { t } = useTranslation()

  const isStudent = userRole === 'student'
  const cards = isStudent ? studentHowItWorksCards : tutorHowItWorksCards
  const translation = isStudent ? 'studentHomePage' : 'tutorHomePage'
  const buttonTranslation = isStudent ? 'findTutorBlock' : 'findStudentBlock'

  const cardsArr = cards.map((card) => {
    return (
      <HowItWorksBlock
        description={card.description}
        image={card.image}
        key={card.id}
        style={style}
        title={card.title}
      />
    )
  })

  return (
    <Box id={guestRoutes.navBar.howItWorks.route} sx={style.root}>
      <TitleWithDescription
        description={t(`${translation}.howItWorks.description`)}
        style={style.mainTitleWithDescription}
        title={t(`${translation}.howItWorks.title`)}
      />
      <Box sx={style.cardsContainer}>{cardsArr}</Box>
      <Button
        component={Link}
        size={SizeEnum.ExtraLarge}
        to={authRoutes.findOffers.path}
        variant={ButtonVariantEnum.Contained}
      >
        {t(`${translation}.${buttonTranslation}.button`)}
      </Button>
    </Box>
  )
}

export default UserHowItWorks
