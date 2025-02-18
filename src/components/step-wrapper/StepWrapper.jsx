import { cloneElement, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import EastIcon from '@mui/icons-material/East'
import WestIcon from '@mui/icons-material/West'

import AppButton from '~/components/app-button/AppButton'
import useSteps from '~/hooks/use-steps'
import { snackbarVariants } from '~/constants'
import { useSnackBarContext } from '~/context/snackbar-context'

import { styles } from '~/components/step-wrapper/StepWrapper.styles'

const StepWrapper = ({ children, steps, data, errors, validateData }) => {
  const { setAlert } = useSnackBarContext()
  const { activeStep, isLastStep, loading, stepOperation, stepErrors } =
    useSteps({
      steps,
      data
    })
  const [tabError, setTabError] = useState([])
  const [isValidForm, setIsValidForm] = useState(false)

  useEffect(() => {
    if (isLastStep) {
      const { isValidData, newErrors } = validateData()
      setIsValidForm(isValidData)
      setTabError(stepErrors(newErrors))

      if (!isValidData) {
        setAlert({
          severity: snackbarVariants.warning,
          message: 'errorMessages.stepperSubmitWarning',
          duration: 6000
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLastStep])

  useEffect(() => {
    setTabError(stepErrors(errors))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors])

  const { next, back, setActiveStep, handleSubmit } = stepOperation
  const { t } = useTranslation()

  const stepLabels = steps.map((step, index) => (
    <Box
      key={step}
      onClick={() => setActiveStep(index)}
      sx={[
        styles.defaultTab,
        index === activeStep && styles.activeTab,
        tabError[index] && styles.error
      ]}
      typography='caption'
    >
      {t(`step.stepLabels.${step}`)}
    </Box>
  ))

  const nextButton = isLastStep ? (
    <AppButton
      disabled={loading || !isValidForm}
      loading={loading}
      onClick={handleSubmit}
      size='small'
      sx={styles.finishBtn}
      variant='contained'
    >
      {t('common.finish')}
    </AppButton>
  ) : (
    <AppButton onClick={next} size='small' sx={styles.btn} variant='contained'>
      {t('common.next')}
      <EastIcon fontSize='small' />
    </AppButton>
  )

  const btnsBox = (
    <Box sx={styles.btnWrapper}>
      <AppButton
        disabled={activeStep === 0}
        onClick={back}
        size='small'
        sx={styles.btn}
        variant='outlined'
      >
        <WestIcon fontSize='small' />
        {t('common.back')}
      </AppButton>
      {nextButton}
    </Box>
  )

  return (
    <Container sx={styles.root}>
      <Box sx={styles.steps}>{stepLabels}</Box>
      <Box sx={styles.stepContent}>
        {cloneElement(children[activeStep], {
          btnsBox,
          stepLabel: steps[activeStep]
        })}
      </Box>
    </Container>
  )
}

export default StepWrapper
