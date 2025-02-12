import { useCallback, useState } from 'react'

import useAxios from '~/hooks/use-axios'
import { useAppSelector } from '~/hooks/use-redux'

import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { userService } from '~/services/user-service'
import { snackbarVariants } from '~/constants'

const useSteps = ({ steps, data }) => {
  const [activeStep, setActiveStep] = useState(0)
  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const { userId } = useAppSelector((state) => state.appMain)

  const updateUser = useCallback(
    (data, formData) => {
      Promise.all([
        userService.updateUser(data, userId),
        userService.updateUserPhoto(formData)
      ])
    },
    [userId]
  )

  const handleResponseError = (error) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }

  const handleResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'becomeTutor.successMessage'
    })
    closeModal()
  }

  const { loading, fetchData } = useAxios({
    service: updateUser,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: handleResponse,
    onResponseError: handleResponseError
  })

  // const stepErrors = Object.values(data).map(
  //   (data) =>
  //     data && data.errors && Object.values(data.errors).find((error) => error)
  // )

  const next = () => {
    setActiveStep((prev) => prev + 1)
  }

  const back = () => {
    setActiveStep((prev) => prev - 1)
  }

  const isLastStep = activeStep === steps.length - 1

  const handleSubmit = () => {
    const {
      firstName,
      lastName,
      country,
      city,
      professionalSummary,
      languages,
      photoFile
    } = data
    const formData = new FormData()
    formData.append('photo', photoFile)

    // const hasErrors = stepErrors.find((error) => error)

    const userInfo = {
      firstName,
      lastName,
      country: country ?? '',
      city: city ?? '',
      professionalSummary: professionalSummary ?? '',
      // mainSubjects: stepData.subjects,
      nativeLanguage: languages ?? ''
    }

    fetchData(userInfo, formData)
    // !hasErrors && fetchData(data, formData)
  }

  const stepOperation = {
    next,
    back,
    handleSubmit,
    setActiveStep
  }

  return { activeStep, isLastStep, stepOperation, loading }
  // return { activeStep, stepErrors, isLastStep, stepOperation, loading }
}

export default useSteps
