/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useEffect } from 'react'
import { Box, Typography, InputAdornment, Slider, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'

import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import Levels from '~/components/levels/Levels'
import { useSnackBarContext } from '~/context/snackbar-context'

import TitleIcon from '~/assets/img/offer-request-form/leak_add.svg'
import StepOneIcon from '~/assets/img/offer-request-form/counter_1.svg'
import StepTwoIcon from '~/assets/img/offer-request-form/counter_2.svg'
import HryvniaIcon from '~/assets/img/offer-request-form/hryvnia.svg'

import useCategoriesNames from '~/hooks/use-categories-names'
import useSubjectsNames from '~/hooks/use-subjects-names'
import useAxios from '~/hooks/use-axios'
import { languagesService } from '~/services/languages-service'
import { axiosClient } from '~/plugins/axiosClient'

import { styles } from './CreateRequestForm.styles'

const normalizeLanguage = (lang: string) =>
  lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()

const CreateRequestForm = () => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [selectedSubject, setSelectedSubject] = useState<any>(null)
  const [proficiencyLevel, setProficiencyLevel] = useState<string>('')
  const [language, setLanguage] = useState<any>(null)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([150, 3500])
  const maxDescriptionLength = 2000

  const { response: categories, loading: loadingCategories } =
    useCategoriesNames({ page: 1, limit: 1000, fetchOnMount: true })

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
    fetchData: createRequest,
    response: requestResponse,
    error: requestError,
    loading: requestLoading
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

  const handleChangeLanguage = (_: any, selectedValue: any) => {
    setLanguage(selectedValue)
  }

  const handleAddLanguage = () => {
    if (!language?.name) return
    const normalized = normalizeLanguage(language.name)
    if (!selectedLanguages.includes(normalized)) {
      setSelectedLanguages((prev) => [...prev, normalized])
    }
    setLanguage(null)
  }

  const handleDeleteLanguage = (langName: string) => {
    setSelectedLanguages((prev) => prev.filter((l) => l !== langName))
  }

  const handleChangeLevel = (_name: string, value: string) => {
    setProficiencyLevel(value)
  }

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPriceRange(newValue as [number, number])
    }
  }

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value) || 0
    setPriceRange((prev) => [newMin, prev[1]])
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value) || 0
    setPriceRange((prev) => [prev[0], newMax])
  }

  const handleCreateRequest = async () => {
    try {
      const averagePrice = Math.round((priceRange[0] + priceRange[1]) / 2)
      const payload = {
        title,
        price: averagePrice,
        description,
        categoryId: selectedCategory?._id,
        subjectId: selectedSubject?._id,
        proficiencyLevel,
        languages: selectedLanguages
      }
      await createRequest(payload)

      setAlert({
        severity: 'success',
        message: 'offerPage.createOffer.successMessage'
      })
    } catch (error) {
      setAlert({
        severity: 'error',
        message: 'offerPage.createOffer.errorMessage'
      })
      console.error('Error creating request:', error)
    }
  }

  const isFormValid =
    title.trim() !== '' &&
    description.trim() !== '' &&
    selectedCategory !== null &&
    selectedSubject !== null &&
    proficiencyLevel.trim() !== '' &&
    selectedLanguages.length > 0

  return (
    <Box sx={{ maxWidth: '645px', width: '100%' }}>
      <Typography component='p' sx={styles.title} variant='h5'>
        <Box alt='Leak add' component='img' src={TitleIcon} sx={styles.img} />
        {t('offerPage.createOffer.title.student')}
      </Typography>
      <Typography component='p' sx={styles.subtitle} variant='body1'>
        {t('offerPage.createOffer.description.student')}
      </Typography>

      <Typography component='p' sx={styles.stepTitle} variant='h6'>
        <Box
          alt='step one icon'
          component='img'
          src={StepOneIcon}
          sx={styles.img}
        />
        {t('offerPage.title.firstStep.student')}
      </Typography>
      <Box sx={styles.stepWrapper}>
        <Typography component='p' sx={styles.stepSubtitle} variant='body1'>
          {t('offerPage.description.category.student')}
        </Typography>
        <AppAutoComplete
          fetchOnFocus
          getOptionLabel={(option) => option.categoryName ?? ''}
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
          fetchCondition={Boolean(selectedCategory)}
          fetchOnFocus
          getOptionLabel={(option) => option.subjectName ?? ''}
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
          {t('offerPage.description.level.student')}
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
        {t('offerPage.title.secondStep.student')}
      </Typography>
      <Box sx={styles.stepWrapper}>
        <Typography component='p' sx={styles.stepSubtitle} variant='body1'>
          {t('offerPage.createOffer.labels.title')}
        </Typography>
        <AppTextField
          fullWidth
          label={t('offerPage.createOffer.placeholders.title')}
          onChange={(e) => setTitle(e.target.value)}
          required
          type='text'
          value={title}
        />

        <Typography
          component='p'
          mt={2}
          sx={styles.stepSubtitle}
          variant='body1'
        >
          {t('offerPage.description.describe.student')}
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
            {`${description.length}/${maxDescriptionLength}`}
          </Typography>
        </Box>
        <Typography
          component='p'
          mt={2}
          sx={styles.stepSubtitle}
          variant='body1'
        >
          {t('offerPage.description.languages.student')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <AppAutoComplete
            getOptionLabel={(option) => option.name ?? ''}
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
          defaultQuantity={3}
          handleChipDelete={handleDeleteLanguage}
          items={selectedLanguages}
          wrapperStyle={styles.chipsList}
        />
        <Typography
          component='p'
          mt={2}
          sx={styles.stepSubtitle}
          variant='body1'
        >
          {t('offerPage.description.price.student')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '270px'
          }}
        >
          <Typography component='p' sx={styles.priceLabel}>
            {priceRange[0]}
          </Typography>
          <Typography component='p' sx={styles.priceLabel}>
            {priceRange[1]}
          </Typography>
        </Box>
        <Slider
          max={3500}
          min={150}
          onChange={handleSliderChange}
          sx={styles.sliderStyles}
          value={priceRange}
          valueLabelDisplay='auto'
        />
        <Stack direction='row' justifyContent='flex-start'>
          <AppTextField
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Box alt='Hryvnia Icon' component='img' src={HryvniaIcon} />
                </InputAdornment>
              ),
              style: styles.inputPriceStyle
            }}
            label={t('offerPage.createOffer.placeholders.min')}
            onChange={handleMinPriceChange}
            sx={{
              ...styles.inputWidth,
              '& input[type=number]': {
                MozAppearance: 'textfield',
                '&::-webkit-outer-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0
                },
                '&::-webkit-inner-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0
                }
              }
            }}
            type='number'
            value={priceRange[0]}
            variant='outlined'
          />
          <Typography sx={styles.priceSymbol}>-</Typography>
          <AppTextField
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Box alt='Hryvnia Icon' component='img' src={HryvniaIcon} />
                </InputAdornment>
              ),
              style: styles.inputPriceStyle
            }}
            label={t('offerPage.createOffer.placeholders.max')}
            onChange={handleMaxPriceChange}
            sx={{
              ...styles.inputWidth,
              '& input[type=number]': {
                MozAppearance: 'textfield',
                '&::-webkit-outer-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0
                },
                '&::-webkit-inner-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0
                }
              }
            }}
            type='number'
            value={priceRange[1]}
            variant='outlined'
          />
        </Stack>
      </Box>

      <Box sx={styles.btnsWrapper}>
        <AppButton
          disabled={!isFormValid}
          onClick={handleCreateRequest}
          sx={styles.btn}
          variant='contained'
        >
          {t('offerPage.createOffer.buttonTitles.student')}
        </AppButton>
        <AppButton sx={styles.btn} variant='outlined'>
          {t('offerPage.createOffer.addToDrafts')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default CreateRequestForm
