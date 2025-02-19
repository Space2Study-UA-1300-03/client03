/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useState } from 'react'
import { Box, Typography, InputAdornment, IconButton } from '@mui/material'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import Levels from '~/components/levels/Levels'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'

import TitleIcon from '~/assets/img/offer-request-form/leak_add.svg'
import StepOneIcon from '~/assets/img/offer-request-form/counter_1.svg'
import StepTwoIcon from '~/assets/img/offer-request-form/counter_2.svg'
import StepThreeIcon from '~/assets/img/offer-request-form/counter_3.svg'
import HryvniaIcon from '~/assets/img/offer-request-form/hryvnia.svg'

import { styles } from './CreateOfferForm.styles'

interface Language {
  name: string
}

const CreateOfferForm = () => {
  const { t } = useTranslation()
  const [description, setDescription] = useState('')
  const [faq, setFaq] = useState([{ id: 1, question: '', answer: '' }])

  const maxDescriptionLength = 1000
  const selectedLanguages: Language[] = []
  const selectedCategory = null
  const selectedSubject = null

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value.length <= maxDescriptionLength) {
      setDescription(event.target.value)
    }
  }

  const handleAddQuestion = () => {
    setFaq([...faq, { id: faq.length + 1, question: '', answer: '' }])
  }

  const handleDeleteQuestion = (id: number) => {
    setFaq(faq.filter((item) => item.id !== id))
  }

  const handleFAQChange = (
    id: number,
    field: 'question' | 'answer',
    value: string
  ) => {
    setFaq(
      faq.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

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
        <AsyncAutocomplete
          fetchOnFocus
          getOptionLabel={(option) => option.name}
          service={() => {}}
          sx={styles.select}
          textFieldProps={{
            label: t('offerPage.createOffer.labels.category'),
            required: true
          }}
          value={selectedCategory}
        />
        <AsyncAutocomplete
          disabled={!selectedCategory}
          fetchCondition={selectedCategory}
          fetchOnFocus
          getOptionLabel={(option) => option.name}
          service={() => {}}
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
        <Levels changeFunc={(name, value) => {}} />
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
            required
            rows={1}
            type='text'
          />
          <Typography component='p' sx={styles.summaryLength}>
            {`${description.length}/100`}
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
        <AsyncAutocomplete
          fetchOnFocus
          getOptionLabel={(option) => option.name}
          service={() => {}}
          sx={{ mb: '16px' }}
          textFieldProps={{
            label: t('offerPage.createOffer.labels.language'),
            required: true
          }}
          value={selectedLanguages}
        />
        <AppChipList
          defaultQuantity={0}
          items={selectedLanguages.map((language) => language.name)}
          wrapperStyle={styles.chipsList}
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
            required
            type='text'
            variant='outlined'
          />
        </Box>
        <Typography component='p' sx={styles.stepSubtitle} variant='body1'>
          {t('offerPage.createOffer.labels.linkCourse')}
        </Typography>
        <AsyncAutocomplete
          fetchOnFocus
          getOptionLabel={(option) => option.name}
          service={() => {}}
          sx={styles.select}
          textFieldProps={{
            label: t('offerPage.createOffer.labels.selectCourse'),
            required: true
          }}
          value={null}
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
        <AppButton sx={styles.btn} variant='contained'>
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
