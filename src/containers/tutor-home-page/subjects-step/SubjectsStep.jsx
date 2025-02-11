import { useState, useEffect, useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { useTranslation } from 'react-i18next'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import AppButton from '~/components/app-button/AppButton'
import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [subject, setSubject] = useState({ category: null, subject: null })
  const [listOfSubjects, setListOfSubjects] = useState([])

  const sameSubjectError = useMemo(
    () =>
      subject.subject?.subjectName &&
      listOfSubjects.includes(subject.subject.subjectName),
    [subject.subject?.subjectName, listOfSubjects]
  )

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
      setListOfSubjects((prev) => [...prev, subject.subject.subjectName])
      setSubject({ category: null, subject: null })
    }
  }

  const handleChipDelete = (item) => {
    setListOfSubjects((prev) => prev.filter((name) => name !== item))
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
            items={listOfSubjects}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
