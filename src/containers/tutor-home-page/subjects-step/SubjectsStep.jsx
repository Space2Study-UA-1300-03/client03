import { useState, useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { categoriesMock } from '~/containers/tutor-home-page/subjects-step/constants'
import { useTranslation } from 'react-i18next'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import AppButton from '~/components/app-button/AppButton'

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [subjects, setSubjects] = useState({ category: null, subject: null })
  const [listOfItems, setListOfItems] = useState([])
  const [sameSubjectError, setSameSubjectError] = useState('')

  const categoryOptions = useMemo(
    () => categoriesMock.map((item) => Object.keys(item)[0]),
    []
  )

  const subjectOptions = useMemo(() => {
    if (!subjects.category) return []
    return (
      categoriesMock.find((cat) => Object.keys(cat)[0] === subjects.category)?.[
        subjects.category
      ] || []
    )
  }, [subjects.category])

  const onChangeCategory = (_, value) =>
    setSubjects({ category: value, subject: null })
  const onChangeSubject = (_, value) =>
    setSubjects((prev) => ({ ...prev, subject: value }))

  const addSubject = () => {
    if (listOfItems.includes(subjects.subject)) {
      setSameSubjectError(t('becomeTutor.categories.sameSubject'))
      return
    }
    setSameSubjectError('')
    setListOfItems((prev) => [...prev, subjects.subject])
    setSubjects({ category: null, subject: null })
  }

  const handleChipDelete = (item) => {
    setListOfItems((prev) => prev.filter((name) => name !== item))
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rightBox}>
        <Box sx={styles.contentBox}>
          <Typography mb={2}>{t('becomeTutor.categories.title')}</Typography>
          <AppAutoComplete
            onChange={onChangeCategory}
            options={categoryOptions}
            sx={{ mb: 2 }}
            textFieldProps={{
              label: t('becomeTutor.categories.mainSubjectsLabel')
            }}
            value={subjects.category}
          />
          <AppAutoComplete
            disabled={!subjects.category}
            onChange={onChangeSubject}
            options={subjectOptions.map((item) => item.name)}
            sx={{ mb: 2 }}
            textFieldProps={{ label: t('becomeTutor.categories.subjectLabel') }}
            value={subjects.subject}
          />
          <AppButton
            disabled={!subjects.subject}
            fullWidth
            onClick={addSubject}
            sx={{ mb: 2 }}
          >
            {t('becomeTutor.categories.btnText')}
          </AppButton>
          {sameSubjectError && (
            <Typography sx={{ textAlign: 'center', color: 'red' }}>
              {sameSubjectError}
            </Typography>
          )}
          <AppChipList
            defaultQuantity={2}
            handleChipDelete={handleChipDelete}
            items={listOfItems}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
