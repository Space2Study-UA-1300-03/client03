import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import Accordions from '~/components/accordion/Accordions'
import { accordionItems } from './accordionItems'

import { TypographyVariantEnum } from '~/types'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { styles } from '~/containers/student-home-page/faq/Faq.styles'

const Faq = () => {
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

  return (
    <Box
      className='section'
      id={studentRoutes.navBar.faq.route}
      sx={styles.container}
    >
      <TitleWithDescription
        description={t('studentHomePage.faq.subtitle')}
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
