/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useState } from 'react'
import { Box, Typography, Slider, Stack, InputAdornment } from '@mui/material'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import Levels from '~/components/levels/Levels'
import { useTranslation } from 'react-i18next'

import TitleIcon from '~/assets/img/offer-request-form/leak_add.svg'
import StepOneIcon from '~/assets/img/offer-request-form/counter_1.svg'
import StepTwoIcon from '~/assets/img/offer-request-form/counter_2.svg'
import HryvniaIcon from '~/assets/img/offer-request-form/hryvnia.svg'

import { styles } from './CreateRequestForm.styles'

interface Language {
  name: string
}

const CreateRequestForm = () => {
  const { t } = useTranslation()
  const minPrice = 150
  const maxPrice = 3500
  const priceRangeValue = [minPrice, maxPrice]
  const selectedLanguages: Language[] = []
  const selectedCategory = null
  const selectedSubject = null
  const maxDescriptionLength = 2000
  const [description, setDescription] = useState('')

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value.length <= maxDescriptionLength) {
      setDescription(event.target.value)
    }
  }

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
          {t('offerPage.description.level.student')}
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
        {t('offerPage.title.secondStep.student')}
      </Typography>
      <Box sx={styles.stepWrapper}>
        <Typography component='p' sx={styles.stepSubtitle} variant='body1'>
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
        <Typography component='p' sx={styles.stepSubtitle} variant='body1'>
          {t('offerPage.description.languages.student')}
        </Typography>
        <AsyncAutocomplete
          fetchOnFocus
          getOptionLabel={(option) => option.name}
          service={() => {}}
          sx={styles.select}
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
            {minPrice}
          </Typography>
          <Typography component='p' sx={styles.priceLabel}>
            {maxPrice}
          </Typography>
        </Box>
        <Slider
          max={maxPrice}
          min={minPrice}
          sx={styles.sliderStyles}
          value={priceRangeValue}
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
            sx={styles.inputWidth}
            type='text'
            value={priceRangeValue[0]}
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
            sx={styles.inputWidth}
            type='text'
            value={priceRangeValue[1]}
            variant='outlined'
          />
        </Stack>
      </Box>
      <Box sx={styles.btnsWrapper}>
        <AppButton sx={styles.btn} variant='contained'>
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
