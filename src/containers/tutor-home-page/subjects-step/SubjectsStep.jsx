import { useState, useEffect, useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import useAxios from '~/hooks/use-axios'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppButton from '~/components/app-button/AppButton'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'

const SubjectsStep = ({ btnsBox, data, handleSubjectChange }) => {
  const { t } = useTranslation()
  const [subject, setSubject] = useState({ category: null, subject: null })
  const [listOfSubjects, setListOfSubjects] = useState(data.interests)

  const sameSubjectError = useMemo(() => {
    if (!Object.keys(listOfSubjects).length) return false
    const presentListSubjects = Object.values(listOfSubjects).flat()
    return (
      subject?.subject?.subjectName &&
      presentListSubjects.includes(subject.subject.subjectName)
    )
  }, [subject?.subject?.subjectName, listOfSubjects])

  const { response: categories, loading: loadingCategories } = useAxios({
    service: categoryService.getCategoriesNames,
    defaultResponse: [],
    fetchOnMount: true
  })

  const {
    response: subjects,
    loading: loadingSubjects,
    fetchData: fetchSubjects
  } = useAxios({
    service: subjectService.getSubjectsNames,
    defaultResponse: [],
    fetchOnMount: false
  })

  useEffect(() => {
    if (subject.category) {
      fetchSubjects(subject.category._id)
    }
  }, [subject.category, fetchSubjects])

  const onChangeCategory = (_, value) => {
    setSubject({ category: value, subject: null })
  }

  const onChangeSubject = (_, value) => {
    setSubject((prev) => ({ ...prev, subject: value }))
  }

  const addSubject = () => {
    if (!sameSubjectError && subject.subject) {
      setListOfSubjects((prevData) => {
        const updatedInterests = { ...prevData }
        const categoryKey = subject.category.categoryName
          .replace(/\s+/g, '-')
          .toLowerCase()
        if (!updatedInterests[categoryKey]) {
          updatedInterests[categoryKey] = []
        }
        updatedInterests[categoryKey].push(subject.subject.subjectName)

        handleSubjectChange('interests', updatedInterests)
        return updatedInterests
      })

      setSubject({ category: null, subject: null })
    }
  }

  const handleChipDelete = (item) => {
    setListOfSubjects((prevData) => {
      const updatedInterests = { ...prevData }
      const categoryWithItem = Object.entries(updatedInterests).find(
        ([, subjects]) => {
          return subjects.includes(item)
        }
      )
      const [category, subjects] = categoryWithItem

      updatedInterests[category] = subjects.filter(
        (subject) => subject !== item
      )
      if (updatedInterests[category].length === 0) {
        delete updatedInterests[category]
      }

      handleSubjectChange('interests', updatedInterests)
      return updatedInterests
    })
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
            getOptionLabel={(option) => option.categoryName ?? option}
            loading={loadingCategories}
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
            loading={loadingSubjects}
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
            items={Object.values(listOfSubjects || {}).flat()}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
