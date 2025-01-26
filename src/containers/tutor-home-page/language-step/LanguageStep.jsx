import Box from '@mui/material/Box'

import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material'
import { languagesMock } from '../subjects-step/constants'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [language, setLanguage] = useState('')
  const handleChange = (event) => {
    setLanguage(event.target.value)
  }
  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <Box>
          <Typography>{t('becomeTutor.languages.title')}</Typography>
          <FormControl fullWidth>
            <InputLabel id='language-select-label' variant='outlined'>
              {' '}
              {t('becomeTutor.languages.autocompleteLabel')}{' '}
            </InputLabel>
            <Select
              label={t('becomeTutor.languages.autocompleteLabel')}
              labelId='language-select-label'
              onChange={handleChange}
              sx={styles.select}
              value={language}
            >
              {languagesMock.map((lang) => (
                <MenuItem key={lang.name} value={lang.name}>
                  {' '}
                  {lang.name}{' '}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
