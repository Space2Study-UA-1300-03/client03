import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import useBreakpoints from '~/hooks/use-breakpoints'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppChipList from '~/components/app-chips-list/AppChipList'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppButton from '~/components/app-button/AppButton'
import useCategoriesNames from '~/hooks/use-categories-names'
import useSubjectsNames from '~/hooks/use-subjects-names'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { useSnackBarContext } from '~/context/snackbar-context'

const SubjectsStep = ({ btnsBox, data, handleSubjectChange }) => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()

  const [subject, setSubject] = useState({ category: null, subject: null })
  const [listOfSubjects, setListOfSubjects] = useState(data.interests)

  const {
    response: categories,
    loading: loadingCategories,
    error: categoriesError
  } = useCategoriesNames({
    page: 1,
    limit: 1000,
    fetchOnMount: true
  })

  const {
    response: subjects,
    loading: loadingSubjects,
    fetchData: fetchSubjects,
    error: subjectsError
  } = useSubjectsNames({
    category: subject.category ? subject.category._id : null,
    page: 1,
    limit: 1000,
    fetchOnMount: false
  })

  useEffect(() => {
    if (subject.category) {
      fetchSubjects()
    }
  }, [subject.category, fetchSubjects])

  const sameSubjectError = useMemo(() => {
    const presentListSubjects = Object.values(listOfSubjects).flat()
    return (
      subject?.subject?.subjectName &&
      presentListSubjects.includes(subject.subject.subjectName)
    )
  }, [subject, listOfSubjects])

  const onChangeCategory = (_, value) => {
    setSubject({ category: value, subject: null })
  }

  const onChangeSubject = (_, value) => {
    setSubject((prev) => ({ ...prev, subject: value }))
  }

  const addSubject = () => {
    if (!sameSubjectError && subject.subject) {
      const updatedInterests = { ...listOfSubjects }
      const categoryKey = subject.category.categoryName.replace(/\s+/g, '-')
      updatedInterests[categoryKey] = updatedInterests[categoryKey] || []
      updatedInterests[categoryKey].push(subject.subject.subjectName)

      handleSubjectChange('interests', updatedInterests)
      setListOfSubjects(updatedInterests)
      setSubject({ category: null, subject: null })
    }
  }

  const handleChipDelete = (item) => {
    const updatedInterests = { ...listOfSubjects }
    const categoryWithItem = Object.entries(updatedInterests).find(
      ([, subjects]) => subjects.includes(item)
    )
    if (categoryWithItem) {
      const [category, subjects] = categoryWithItem
      updatedInterests[category] = subjects.filter(
        (subject) => subject !== item
      )
      if (updatedInterests[category].length === 0) {
        delete updatedInterests[category]
      }
      handleSubjectChange('interests', updatedInterests)
      setListOfSubjects(updatedInterests)
    }
  }

  useEffect(() => {
    if (categoriesError) {
      setAlert({
        severity: 'error',
        message: 'error.categoriesLoad'
      })
    }
    if (subjectsError) {
      setAlert({
        severity: 'error',
        message: 'error.subjectsLoad'
      })
    }
  }, [categoriesError, subjectsError, setAlert])

  const categoriesOptions = useMemo(
    () => ({
      pagination: categories.pagination,
      data: categories.data.map((option) => ({
        ...option,
        categoryName: t(`categoriesNames.categories.${option.categoryName}`)
      }))
    }),
    [categories.data, categories.pagination, t]
  )

  const subjectsOptions = useMemo(
    () => ({
      data: subjects.data.map((option) => ({
        ...option,
        subjectName: t(`subjectsNames.subjects.${option.subjectName}`)
      })),
      pagination: subjects.pagination
    }),
    [subjects.data, subjects.pagination, t]
  )

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && (
        <Box sx={styles.imgContainer}>
          <Box component='img' src={img} sx={styles.img} />
        </Box>
      )}
      <Box sx={styles.rightBox}>
        <Box sx={styles.contentBox}>
          <Typography mb={2}>{t('becomeTutor.categories.title')}</Typography>
          {isMobile && (
            <Box sx={styles.imgContainer}>
              <Box component='img' src={img} sx={styles.img} />
            </Box>
          )}
          <AppAutoComplete
            getOptionLabel={(option) => option.categoryName ?? option}
            loading={loadingCategories}
            onChange={onChangeCategory}
            options={categoriesOptions.data || []}
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
            options={subjectsOptions.data || []}
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
