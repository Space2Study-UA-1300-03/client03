import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
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

const GeneralInfoStep = ({ btnsBox }) => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    proffessionalSummary: '',
    more18Years: false
  })
  const [currentCountries, setCurrentCountries] = useState([])
  const [currentCities, setCurrentCities] = useState([])
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()

  const onDeleteError = () => {
    setCurrentCities([])
    setAlert({
      severity: snackbarVariants.error,
      message: t('becomeTutor.generalInfo.citiesNotFound')
    })
  }

  const { response: countries, loading: loadingCountries } = useAxios({
    service: stepperService.getCountries,
    defaultResponse: [],
    fetchOnMount: true
  })

  const {
    response: cities,
    loading: loadingCities,
    fetchData: fetchCity
  } = useAxios({
    service: (country) => stepperService.getCities(country),
    defaultResponse: [],
    fetchOnMount: false,
    onResponseError: onDeleteError
  })

  useEffect(() => {
    if (countries?.length !== 0) {
      const filteredCountries = countries?.filter(
        (country) => !['Russia', 'China'].includes(country.name)
      )
      setCurrentCountries(filteredCountries)
    }
  }, [countries])

  useEffect(() => {
    if (cities?.length !== 0) {
      const uniqueCities = cities?.filter(
        (city, index, self) =>
          index === self.findIndex((c) => c.name === city.name)
      )
      setCurrentCities(uniqueCities)
    }
  }, [cities])

  const handleCoutryChange = (_, selectedCountryName) => {
    if (selectedCountryName) {
      const selectedCountry = countries.find(
        (country) => country.name === selectedCountryName
      )

      fetchCity(selectedCountry.iso2)
    }
    setData((prev) => {
      const newData = {
        ...prev,
        country: selectedCountryName || '',
        city: ''
      }

      return newData
    })
  }

  const handleInputChange =
    (key, type = 'input') =>
    (event, value) => {
      let updatedValue

      switch (type) {
        case 'input':
          updatedValue = event.target.value
          break
        case 'checkbox':
          updatedValue = event.target.checked
          break
        case 'select':
          updatedValue = value
          break
      }

      setData((prev) => {
        const newData = {
          ...prev,
          [key]: updatedValue
        }

        return newData
      })
    }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rightBox}>
        <Box sx={styles.contentBox}>
          <Typography mb='20px'>
            {t('becomeTutor.generalInfo.title')}
          </Typography>
          <Box component='form' sx={styles.form}>
            <Box sx={styles.inputsContainer}>
              <AppTextField
                autoFocus
                label={t('common.labels.firstName')}
                onChange={handleInputChange('firstName')}
              />
              <AppTextField
                label={t('common.labels.lastName')}
                onChange={handleInputChange('lastName')}
              />
              <AppAutoComplete
                loading={loadingCountries}
                onChange={handleCoutryChange}
                options={currentCountries.map((country) => country.name)}
                sx={{ mb: '20px' }}
                textFieldProps={{
                  label: t('common.labels.country')
                }}
                value={data.country || null}
              />
              <AppAutoComplete
                disabled={!data.country || currentCities.length === 0}
                loading={loadingCities}
                onChange={handleInputChange('city', 'select')}
                options={currentCities?.map((city) => city.name)}
                sx={{ mb: '16px' }}
                textFieldProps={{
                  label: t('common.labels.city')
                }}
                value={data.city || null}
              />
              <AppTextArea
                errorMsg={
                  data?.proffessionalSummary?.length === textAreaLimit.limit
                    ? t('becomeTutor.generalInfo.limitCharacters')
                    : null
                }
                fullWidth
                label={t('becomeTutor.generalInfo.textFieldLabel')}
                maxLength={textAreaLimit.limit}
                onChange={handleInputChange('proffessionalSummary')}
                sx={styles.fullWidth}
                value={data?.proffessionalSummary || ''}
              />
            </Box>
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Typography sx={styles.checkboxLabel}>
                  {t('common.confirmYears')}
                </Typography>
              }
              onChange={handleInputChange('more18Years', 'checkbox')}
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
