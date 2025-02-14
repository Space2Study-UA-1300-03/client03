import Box from '@mui/material/Box'

import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import { useState } from 'react'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { student, tutor } from '~/constants'
import { languagesService } from '~/services/languages-service'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AddLanguageBtn from './AddLanguageBtn'
import AppChipList from '~/components/app-chips-list/AppChipList'
import useAxios from '~/hooks/use-axios'

const LanguageStep = ({ userRole, btnsBox }) => {
  const { t } = useTranslation()
  const [language, setLanguage] = useState('')
  const [languagesList, setLanguagesList] = useState([])

  const { response: languages, loading: loadingLanguages } = useAxios({
    service: languagesService.getLanguages,
    defaultResponse: [],
    fetchOnMount: true
  })

  const handleChange = (_, selectedValue) => {
    setLanguage(selectedValue)
  }
  const addLanguage = () => {
    if (!language.name || languagesList.includes(language.name)) {
      return
    }
    setLanguagesList([...languagesList, language.name])
    setLanguage('')
  }
  const handleDeleteLanguage = (name) => {
    setLanguagesList(languagesList.filter((lang) => lang !== name))
  }
  const StudentLangStep = () => {
    return (
      <Box>
        <Typography>{t('becomeTutor.languages.studentTitle')}</Typography>
        <AppAutoComplete
          getOptionLabel={(option) => option.name || ''}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          key={languages.id}
          loading={loadingLanguages}
          onChange={handleChange}
          options={languages}
          sx={{ mt: '20px' }}
          textFieldProps={{
            label: t('becomeTutor.languages.autocompleteLabelStudent')
          }}
          value={language}
        />
      </Box>
    )
  }

  const TutorLangStep = () => {
    return (
      <Box>
        <Typography>{t('becomeTutor.languages.tutorTitle')}</Typography>
        <AppAutoComplete
          getOptionLabel={(option) => option.name || ''}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          key={languages.id}
          loading={loadingLanguages}
          onChange={handleChange}
          options={languages}
          sx={{ mt: '20px' }}
          textFieldProps={{
            label: t('becomeTutor.languages.autocompleteLabelTutor')
          }}
          value={language}
        />
        <AddLanguageBtn addLanguage={addLanguage} language={language} />
        <AppChipList
          handleChipDelete={handleDeleteLanguage}
          items={languagesList}
        />
      </Box>
    )
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        {userRole === student && <StudentLangStep />}
        {userRole === tutor && <TutorLangStep />}
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
