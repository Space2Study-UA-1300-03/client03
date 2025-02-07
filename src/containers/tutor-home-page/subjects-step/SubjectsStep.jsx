import { useState, useEffect, useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { useTranslation } from 'react-i18next'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import AppButton from '~/components/app-button/AppButton'
import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [subject, setSubject] = useState({
    category: null,
    subject: null
  })
  const [listOfItems, setListOfItems] = useState([])
  const [categories, setCategories] = useState([])
  const [subjects, setSubjects] = useState([])
  const sameSubjectError = useMemo(
    () => subject.subject && listOfItems.includes(subject.subject.subjectName),
    [subject.subject, listOfItems]
  )

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosClient.get(URLs.categories.getNames)
        setCategories(response.data)
        console.log('Fetched categories:', response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  console.log('subject', subject)

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!subject.category?._id) return

      try {
        const response = await axiosClient.get(
          `/categories/${subject.category._id}/subjects/names`
        )
        setSubjects(response.data)
        console.log('Fetched subjects:', response.data)
      } catch (error) {
        console.error('Error fetching subjects:', error)
      }
    }

    fetchSubjects()
  }, [subject.category])

  const onChangeCategory = (_, value) =>
    setSubject({ category: value, subject: null })

  const onChangeSubject = (_, value) =>
    setSubject((prev) => ({ ...prev, subject: value }))

  const addSubject = () => {
    if (sameSubjectError) {
      return
    }
    setListOfItems((prev) => [...prev, subject?.subject?.subjectName])
    setSubject({ category: null, subject: null })
  }

  const handleChipDelete = (item) => {
    setListOfItems((prev) => prev.filter((name) => name !== item))
  }
  console.log('listOfItems:', listOfItems)
  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rightBox}>
        <Box sx={styles.contentBox}>
          <Typography mb={2}>{t('becomeTutor.categories.title')}</Typography>
          <AppAutoComplete
            getOptionLabel={(option) => option.categoryName ?? option}
            onChange={onChangeCategory}
            options={categories}
            sx={{ mb: 2 }}
            textFieldProps={{
              label: t('becomeTutor.categories.mainSubjectsLabel')
            }}
            value={subject.category}
          />
          <AppAutoComplete
            disabled={!subject.category}
            getOptionLabel={(option) => option.subjectName ?? option}
            onChange={onChangeSubject}
            options={subjects}
            sx={{ mb: 2 }}
            textFieldProps={{ label: t('becomeTutor.categories.subjectLabel') }}
            value={subject.subject}
          />
          <AppButton
            disabled={!subject.subject || sameSubjectError}
            fullWidth
            onClick={addSubject}
            sx={{ mb: 2 }}
          >
            {t('becomeTutor.categories.btnText')}
          </AppButton>
          {sameSubjectError && (
            <Typography sx={{ textAlign: 'center', color: 'red', mb: 2 }}>
              {t('becomeTutor.categories.sameSubject')}
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
