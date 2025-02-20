import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import useBreakpoints from '~/hooks/use-breakpoints'

import { Box, Typography, Checkbox, FormControlLabel } from '@mui/material'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import useAxios from '~/hooks/use-axios'
import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { stepperService } from '~/services/stepper-service'
import { textAreaLimit, snackbarVariants } from '~/constants'
import { useSnackBarContext } from '~/context/snackbar-context'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'

const GeneralInfoStep = ({
  btnsBox,
  data,
  handleChange,
  handleDataChange,
  handleNonInputValueChange,
  errors,
  handleBlur
}) => {
  const [currentCities, setCurrentCities] = useState(null)
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()

  const onResponseCityError = () => {
    handleNonInputValueChange('city', '')
    setCurrentCities(null)
    setAlert({
      severity: snackbarVariants.error,
      message: t('becomeTutor.generalInfo.citiesNotFound')
    })
  }

  const onResponseCity = (response) => {
    setCurrentCities(response)
  }

  const { response: countries, loading: loadingCountries } = useAxios({
    service: stepperService.getCountries,
    defaultResponse: null,
    fetchOnMount: true
  })

  const { loading: loadingCities, fetchData: fetchCity } = useAxios({
    service: (country) => stepperService.getCities(country),
    defaultResponse: null,
    fetchOnMount: false,
    onResponse: onResponseCity,
    onResponseError: onResponseCityError
  })

  useEffect(() => {
    if (data?.country && countries) {
      const selectedCountry = countries.find(
        (country) => country.name === data.country
      )
      fetchCity(selectedCountry.iso2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries])

  const handleCoutryChange = (_, selectedCountryName) => {
    if (selectedCountryName) {
      const selectedCountry = countries.find(
        (country) => country.name === selectedCountryName
      )

      fetchCity(selectedCountry.iso2)
    }
    setCurrentCities(null)

    handleDataChange({
      country: selectedCountryName || '',
      city: ''
    })
  }

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && (
        <Box sx={styles.imgContainer}>
          <Box component='img' src={img} sx={styles.img} />
        </Box>
      )}
      <Box sx={styles.rightBox}>
        <Box sx={styles.contentBox}>
          <Typography mb='20px'>
            {t('becomeTutor.generalInfo.title')}
          </Typography>
          {isMobile && (
            <Box sx={styles.imgContainer}>
              <Box component='img' src={img} sx={styles.img} />
            </Box>
          )}
          <Box sx={styles.form}>
            <Box sx={styles.inputsContainer}>
              <AppTextField
                autoFocus
                errorMsg={t(errors.firstName || '')}
                label={t('common.labels.firstName')}
                onBlur={handleBlur('firstName')}
                onChange={handleChange('firstName')}
                required
                value={data.firstName}
              />
              <AppTextField
                errorMsg={t(errors.lastName || '')}
                label={t('common.labels.lastName')}
                onBlur={handleBlur('lastName')}
                onChange={handleChange('lastName')}
                required
                value={data.lastName}
              />
              <AppAutoComplete
                loading={loadingCountries}
                onChange={handleCoutryChange}
                options={countries?.map((country) => country.name)}
                sx={{ mb: '20px' }}
                textFieldProps={{
                  label: t('common.labels.country')
                }}
                value={data.country || null}
              />
              <AppAutoComplete
                disabled={!currentCities}
                loading={loadingCities}
                onChange={(_, value) =>
                  handleNonInputValueChange('city', value)
                }
                options={currentCities?.map((city) => city.name)}
                sx={{ mb: '16px' }}
                textFieldProps={{
                  label: t('common.labels.city')
                }}
                value={data.city || null}
              />
              <AppTextArea
                errorMsg={
                  data?.professionalSummary?.length === textAreaLimit.limit
                    ? t('becomeTutor.generalInfo.limitCharacters')
                    : null
                }
                fullWidth
                label={t('becomeTutor.generalInfo.textFieldLabel')}
                maxLength={textAreaLimit.limit}
                onChange={handleChange('professionalSummary')}
                sx={styles.fullWidth}
                value={data?.professionalSummary || ''}
              />
            </Box>
            <FormControlLabel
              checked={data?.more18Years || false}
              control={<Checkbox />}
              label={
                <Typography sx={styles.checkboxLabel}>
                  {t('common.confirmYears')}
                </Typography>
              }
              onChange={handleChange('more18Years')}
            />
            <Typography sx={styles.requiredField}>
              {t('becomeTutor.generalInfo.helperText')}
            </Typography>
          </Box>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
