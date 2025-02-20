import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import useBreakpoints from '~/hooks/use-breakpoints'

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
  const { isLaptopAndAbove, isMobile } = useBreakpoints()

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

  const options = useMemo(
    () =>
      languages.map((lang) => ({
        ...lang,
        name: t(`languages.${lang.name}`)
      })),
    [languages, t]
  )

  const StudentLangStep = () => {
    return (
      <Box>
        <Typography>{t('becomeTutor.languages.studentTitle')}</Typography>
        {isMobile && (
          <Box sx={styles.imgContainer}>
            <Box component='img' src={img} sx={styles.img} />
          </Box>
        )}
        <AppAutoComplete
          key={languages.id}
          loading={loadingLanguages}
          onChange={(_, value) => handleLanguageChange('languages', [value])}
          options={options?.map((language) => language.name)}
          sx={{ mt: '20px' }}
          textFieldProps={{
            label: t('becomeTutor.languages.autocompleteLabelStudent')
          }}
          value={data?.languages[0] || null}
        />
      </Box>
    )
  }

  const TutorLangStep = () => {
    return (
      <Box>
        <Typography>{t('becomeTutor.languages.tutorTitle')}</Typography>
        {isMobile && (
          <Box sx={styles.imgContainer}>
            <Box component='img' src={img} sx={styles.img} />
          </Box>
        )}
        <AppAutoComplete
          getOptionLabel={(option) => option.name || ''}
          key={languages.id}
          loading={loadingLanguages}
          onChange={handleChange}
          options={options}
          sx={{ mt: '20px' }}
          textFieldProps={{
            label: t('becomeTutor.languages.autocompleteLabelTutor')
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
      {isLaptopAndAbove && (
        <Box sx={styles.imgContainer}>
          <Box component='img' src={img} sx={styles.img} />
        </Box>
      )}
      <Box sx={styles.rigthBox}>
        {userRole === student && <StudentLangStep />}
        {userRole === tutor && <TutorLangStep />}
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
