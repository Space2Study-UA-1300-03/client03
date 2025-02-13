import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import { student, tutor } from '~/constants'
import { languagesService } from '~/services/languages-service'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppChipList from '~/components/app-chips-list/AppChipList'
import useAxios from '~/hooks/use-axios'
import AddLanguageBtn from './AddLanguageBtn'

import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'

const LanguageStep = ({ userRole, btnsBox, data, handleLanguageChange }) => {
  const { t } = useTranslation()
  const [language, setLanguage] = useState('')

  const { response: languages, loading: loadingLanguages } = useAxios({
    service: languagesService.getLanguages,
    defaultResponse: [],
    fetchOnMount: true
  })

  const handleChange = (_, selectedValue) => {
    setLanguage(selectedValue)
  }

  const addLanguage = () => {
    if (!language.name || data?.languages?.includes(language.name)) {
      return
    }
    handleLanguageChange('languages', [
      ...(data.languages || []),
      language.name
    ])
    setLanguage('')
  }

  const handleDeleteLanguage = (name) => {
    const updatedLanguageList = data?.languages.filter((lang) => lang !== name)
    handleLanguageChange('languages', [...updatedLanguageList])
  }

  const StudentLangStep = () => {
    return (
      <Box>
        <Typography>{t('becomeTutor.languages.studentTitle')}</Typography>
        <AppAutoComplete
          getOptionLabel={(option) => option.name || ''}
          key={languages.id}
          loading={loadingLanguages}
          onChange={handleChange}
          options={languages}
          sx={{ mt: '20px' }}
          textFieldProps={{
            label: t('becomeTutor.languages.autocompleteLabel')
          }}
          value={language || null}
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
          key={languages.id}
          loading={loadingLanguages}
          onChange={handleChange}
          options={languages}
          sx={{ mt: '20px' }}
          textFieldProps={{
            label: t('becomeTutor.languages.autocompleteLabel')
          }}
          value={language || null}
        />
        <AddLanguageBtn addLanguage={addLanguage} language={language} />
        <AppChipList
          handleChipDelete={handleDeleteLanguage}
          items={data?.languages || []}
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
