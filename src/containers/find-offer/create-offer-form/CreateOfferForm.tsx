/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useEffect } from 'react'
import { Box, Typography, InputAdornment, IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CloseIcon from '@mui/icons-material/Close'

import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import Levels from '~/components/levels/Levels'
import { useSnackBarContext } from '~/context/snackbar-context'

import TitleIcon from '~/assets/img/offer-request-form/leak_add.svg'
import StepOneIcon from '~/assets/img/offer-request-form/counter_1.svg'
import StepTwoIcon from '~/assets/img/offer-request-form/counter_2.svg'
import StepThreeIcon from '~/assets/img/offer-request-form/counter_3.svg'
import HryvniaIcon from '~/assets/img/offer-request-form/hryvnia.svg'

import useCategoriesNames from '~/hooks/use-categories-names'
import useSubjectsNames from '~/hooks/use-subjects-names'
import useAxios from '~/hooks/use-axios'
import { languagesService } from '~/services/languages-service'
import { axiosClient } from '~/plugins/axiosClient'

import { styles } from './CreateOfferForm.styles'

const normalizeLanguage = (lang: string) => {
  return lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()
}

const mockCourses = [
  { name: 'Fundamentals of Mathematics' },
  { name: 'Introduction to Programming' },
  { name: 'History of Art 101' }
]

const CreateOfferForm = () => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()

  const [description, setDescription] = useState('')
  const [faq, setFaq] = useState([{ id: 1, question: '', answer: '' }])
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [selectedSubject, setSelectedSubject] = useState<any>(null)
  const [proficiencyLevel, setProficiencyLevel] = useState<string>('')
  const [language, setLanguage] = useState<any>(null)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [price, setPrice] = useState('')
  const [title, setTitle] = useState('')
  const maxDescriptionLength = 1000

  const { response: categories, loading: loadingCategories } =
    useCategoriesNames({
      page: 1,
      limit: 1000,
      fetchOnMount: true
    })

  const {
    response: subjects,
    loading: loadingSubjects,
    fetchData: fetchSubjects
  } = useSubjectsNames({
    category: selectedCategory ? selectedCategory._id : null,
    page: 1,
    limit: 1000,
    fetchOnMount: false
  })

  const { response: allLanguages, loading: loadingLanguages } = useAxios({
    service: languagesService.getLanguages,
    defaultResponse: [],
    fetchOnMount: true
  })

  const {
    fetchData: createOffer,
    response: offerResponse,
    error: offerError,
    loading: offerLoading
  } = useAxios({
    service: (payload) => axiosClient.post('/offers', payload),
    defaultResponse: {},
    fetchOnMount: false
  })

  useEffect(() => {
    if (selectedCategory) {
      fetchSubjects()
      setSelectedSubject(null)
    }
  }, [selectedCategory, fetchSubjects])

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxDescriptionLength) {
      setDescription(e.target.value)
    }
  }

  const handleAddQuestion = () => {
    setFaq((prev) => [
      ...prev,
      { id: prev.length + 1, question: '', answer: '' }
    ])
  }

  const handleDeleteQuestion = (id: number) => {
    setFaq((prev) => prev.filter((item) => item.id !== id))
  }

  const handleFAQChange = (
    id: number,
    field: 'question' | 'answer',
    value: string
  ) => {
    setFaq((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  const handleChangeLanguage = (_: any, selectedValue: any) => {
    setLanguage(selectedValue)
  }

  const handleAddLanguage = () => {
    if (!language?.name) return
    const normalized = normalizeLanguage(language.name)
    if (selectedLanguages.includes(normalized)) return
    setSelectedLanguages((prev) => [...prev, normalized])
    setLanguage(null)
  }

  const handleDeleteLanguage = (langName: string) => {
    setSelectedLanguages((prev) => prev.filter((l) => l !== langName))
  }

  const handleChangeLevel = (_name: string, value: string) => {
    setProficiencyLevel(value)
  }

  const handleCreateOffer = async () => {
    try {
      const numericPrice = Number(price) || 0
      const payload = {
        title,
        description,
        price: numericPrice,
        categoryId: selectedCategory?._id,
        subjectId: selectedSubject?._id,
        proficiencyLevel,
        languages: selectedLanguages,
        faq,
        courseName: selectedCourse?.name || null
      }

      await createOffer(payload)
      setAlert({
        severity: 'success',
        message: 'offerPage.createOffer.successMessage'
      })
    } catch (error) {
      setAlert({
        severity: 'error',
        message: 'offerPage.createOffer.errorMessage'
      })
      console.error('Error creating offer:', error)
    }
  }

  const isFormValid =
    title.trim() !== '' &&
    description.trim() !== '' &&
    selectedCategory !== null &&
    selectedSubject !== null &&
    proficiencyLevel.trim() !== '' &&
    selectedLanguages.length > 0 &&
    price.trim() !== '' &&
    selectedCourse !== null

  return (
    <Box sx={{ maxWidth: '645px', width: '100%' }}>
      <Typography component='p' sx={styles.title} variant='h5'>
        <Box alt='Leak add' component='img' src={TitleIcon} sx={styles.img} />
        {t('offerPage.createOffer.title.tutor')}
      </Typography>
      <Typography component='p' sx={styles.subtitle} variant='body1'>
        {t('offerPage.createOffer.description.tutor')}
      </Typography>

      <Typography component='p' sx={styles.stepTitle} variant='h6'>
        <Box
          alt='step one icon'
          component='img'
          src={StepOneIcon}
          sx={styles.img}
        />
        {t('offerPage.title.firstStep.tutor')}
      </Typography>
      <Box sx={styles.stepWrapper}>
        <Typography component='p' sx={styles.stepSubtitle} variant='body1'>
          {t('offerPage.description.category.tutor')}
        </Typography>
        <AppAutoComplete
          getOptionLabel={(option) => option?.categoryName || ''}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          loading={loadingCategories}
          onChange={(_, value) => setSelectedCategory(value)}
          options={categories?.data || []}
          sx={styles.select}
          textFieldProps={{
            label: t('offerPage.createOffer.labels.category'),
            required: true
          }}
          value={selectedCategory}
        />
        <AppAutoComplete
          disabled={!selectedCategory}
          getOptionLabel={(option) => option?.subjectName || ''}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          loading={loadingSubjects}
          onChange={(_, value) => setSelectedSubject(value)}
          options={subjects?.data || []}
          sx={styles.select}
          textFieldProps={{
            label: t('offerPage.createOffer.labels.subject'),
            required: true
          }}
          value={selectedSubject}
        />
        <Typography component='p' sx={styles.stepSubtitle} variant='body1'>
          {t('offerPage.description.level.tutor')}
        </Typography>
        <Levels changeFunc={handleChangeLevel} />
      </Box>

      <Typography component='p' sx={styles.stepTitle} variant='h6'>
        <Box
          alt='step two icon'
          component='img'
          src={StepTwoIcon}
          sx={styles.img}
        />
        {t('offerPage.title.secondStep.tutor')}
      </Typography>
      <Box sx={styles.stepWrapper}>
        <Typography component='p' sx={styles.stepSubtitle} variant='body1'>
          {t('offerPage.createOffer.labels.title')}
        </Typography>
        <Box sx={{ position: 'relative' }}>
          <AppTextField
            fullWidth
            label={t('offerPage.createOffer.placeholders.title')}
            onChange={(e) => setTitle(e.target.value)}
            required
            rows={1}
            type='text'
            value={title}
          />
          <Typography component='p' sx={styles.summaryLength}>
            {`${title.length}/100`}
          </Typography>
        </Box>
        <Typography component='p' sx={styles.stepSubtitle} variant='body1'>
          {t('offerPage.description.describe.tutor')}
        </Typography>
        <Box sx={{ position: 'relative' }}>
          <AppTextField
            fullWidth
            label={t('offerPage.createOffer.labels.describe')}
            multiline
            onChange={handleDescriptionChange}
            rows={4}
            value={description}
          />
          <Typography component='p' sx={styles.summaryLength}>
            {description.length}/{maxDescriptionLength}
          </Typography>
        </Box>
        <Typography component='p' sx={styles.stepSubtitle} variant='body1'>
          {t('offerPage.description.languages.tutor')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <AppAutoComplete
            getOptionLabel={(option) => option?.name || ''}
            loading={loadingLanguages}
            onChange={handleChangeLanguage}
            options={allLanguages || []}
            sx={{ width: '250px' }}
            textFieldProps={{
              label: t('offerPage.createOffer.labels.language'),
              required: true
            }}
            value={language}
          />
          <AppButton onClick={handleAddLanguage} variant='contained'>
            {t('common.add')}
          </AppButton>
        </Box>
        <AppChipList
          defaultQuantity={2}
          handleChipDelete={handleDeleteLanguage}
          items={selectedLanguages}
        />
        <Typography component='p' sx={styles.stepSubtitle} variant='body1'>
          {t('offerPage.description.price.tutor')}
        </Typography>
        <Box
          sx={{
            width: '270px',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <AppTextField
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Box alt='Hryvnia Icon' component='img' src={HryvniaIcon} />
                </InputAdornment>
              ),
              style: { fontSize: '14px', color: '#455A64' }
            }}
            onChange={(e) => setPrice(e.target.value)}
            required
            type='text'
            value={price}
            variant='outlined'
          />
        </Box>
        <Typography component='p' sx={styles.stepSubtitle} variant='body1'>
          {t('offerPage.createOffer.labels.linkCourse')}
        </Typography>
        <AppAutoComplete
          getOptionLabel={(option) => option?.name || ''}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          onChange={(_, newValue) => setSelectedCourse(newValue)}
          options={mockCourses}
          sx={styles.select}
          textFieldProps={{
            label: t('offerPage.createOffer.labels.selectCourse'),
            required: true
          }}
          value={selectedCourse}
        />
      </Box>

      <Typography component='p' sx={styles.stepTitle} variant='h6'>
        <Box
          alt='step three icon'
          component='img'
          src={StepThreeIcon}
          sx={styles.img}
        />
        {t('offerPage.title.thirdStep')}
      </Typography>
      <Box sx={styles.stepWrapper}>
        <Typography component='p' sx={styles.stepSubtitle} variant='body1'>
          {t('offerPage.description.thirdStep.tutor')}
        </Typography>
        {faq.map((item) => (
          <Box key={item.id} sx={{ display: 'flex' }}>
            <Box sx={{ width: '100%' }}>
              <AppTextField
                fullWidth
                onChange={(e) =>
                  handleFAQChange(item.id, 'question', e.target.value)
                }
                placeholder={t('offerPage.createOffer.labels.question')}
                sx={{ mb: '10px' }}
                value={item.question}
              />
              <AppTextField
                fullWidth
                multiline
                onChange={(e) =>
                  handleFAQChange(item.id, 'answer', e.target.value)
                }
                placeholder={t('offerPage.createOffer.labels.answer')}
                rows={4}
                value={item.answer}
              />
              <Typography sx={{ ...styles.summaryLength, textAlign: 'left' }}>
                {`${item.answer?.length}/400`}
              </Typography>
            </Box>
            <Box sx={{ ml: '10px' }}>
              <IconButton
                onClick={() => handleDeleteQuestion(item.id)}
                sx={styles.icon}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
        <AppButton
          onClick={handleAddQuestion}
          sx={styles.btn}
          variant='outlined'
        >
          {t('button.addQuestion')}
        </AppButton>
      </Box>

      <Box sx={styles.btnsWrapper}>
        <AppButton
          disabled={!isFormValid}
          onClick={handleCreateOffer}
          sx={styles.btn}
          variant='contained'
        >
          {t('offerPage.createOffer.buttonTitles.tutor')}
        </AppButton>
        <AppButton sx={styles.btn} variant='outlined'>
          {t('offerPage.createOffer.addToDrafts')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default CreateOfferForm
