import { useState, useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { categoriesMock } from '~/containers/tutor-home-page/subjects-step/constants'
import { useTranslation } from 'react-i18next'

import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import AppButton from '~/components/app-button/AppButton'

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [subjects, setSubjects] = useState({
    category: null,
    subject: null
  })

  const categoryOptions = useMemo(
    () => categoriesMock.map((item) => Object.keys(item)[0]),
    []
  )

  const subjectOptions = useMemo(() => {
    return subjects.category
      ? categoriesMock.find(
          (cat) => Object.keys(cat)[0] === subjects.category
        )?.[subjects.category] || []
      : []
  }, [subjects.category])

  const onChangeCategory = (_, value) => {
    setSubjects({ category: value, subject: null })
  }

  const onChangeSubject = (_, value) => {
    setSubjects((prev) => ({ category: prev.category, subject: value }))
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rightBox}>
        <Box sx={styles.contentBox}>
          <Typography mb='20px'>{t('becomeTutor.categories.title')}</Typography>
          <AppAutoComplete
            onChange={onChangeCategory}
            options={categoryOptions}
            sx={{ mb: '20px' }}
            textFieldProps={{
              label: t('becomeTutor.categories.mainSubjectsLabel')
            }}
            value={subjects.category}
          />
          <AppAutoComplete
            disabled={!subjects.category}
            onChange={onChangeSubject}
            options={subjectOptions.map((item) => item.name)}
            sx={{ mb: '16px' }}
            textFieldProps={{
              label: t('becomeTutor.categories.subjectLabel')
            }}
            value={subjects.subject}
          />
          <AppButton disabled={!subjects.subject} fullWidth>
            {t('becomeTutor.categories.btnText')}
          </AppButton>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
