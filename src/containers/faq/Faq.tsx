import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import Accordions from '~/components/accordion/Accordions'
import { accordionStudentItems, accordionTutorItems } from './accordionItems'

import { TypographyVariantEnum } from '~/types'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { tutorRoutes } from '~/router/constants/tutorRoutes'
import { styles } from '~/containers/faq/Faq.styles'

type FaqProps = {
  userRole: 'student' | 'tutor'
}

const Faq = ({ userRole }: FaqProps) => {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState<number | number[] | null>(null)

  const handleChange = (index: number) => {
    setActiveIndex((prev) => {
      const multiple = true

      if (multiple && Array.isArray(prev)) {
        return prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      }

      return prev === index ? null : index
    })
  }

  const accordionItems =
    userRole === 'student' ? accordionStudentItems : accordionTutorItems

  const subtitle =
    userRole === 'student'
      ? t('studentHomePage.faq.subtitle')
      : t('tutorHomePage.faq.subtitle')

  const route =
    userRole === 'student'
      ? studentRoutes.navBar.faq.route
      : tutorRoutes.navBar.faq.route

  return (
    <Box className='section' id={route} sx={styles.container}>
      <TitleWithDescription
        description={subtitle}
        style={styles.titleWithDescription}
        title={t('studentHomePage.faq.title')}
      />

      <Accordions
        activeIndex={activeIndex}
        descriptionVariant={TypographyVariantEnum.Body2}
        icon={<ExpandMoreRoundedIcon />}
        items={accordionItems}
        onChange={handleChange}
        square
        titleVariant={TypographyVariantEnum.H6}
      />
    </Box>
  )
}

export default Faq
