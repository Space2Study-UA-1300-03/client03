import { useState } from 'react'
import useAxios from '~/hooks/use-axios'

import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { userService } from '~/services/user-service'
import { snackbarVariants } from '~/constants'

const useSteps = ({ steps, data }) => {
  const [activeStep, setActiveStep] = useState(0)
  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()

  const updateUser = (params) => {
    const { userInfo, formData } = params
    return Promise.all([
      userService.updateUser(userInfo),
      userService.updateUserPhoto(formData)
    ])
  }

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
      photoFile = [],
      interests
    } = data

    // const hasErrors = stepErrors.find((error) => error)

    const formData = new FormData()
    formData.append('photo', photoFile[0])

    const userInfo = {
      firstName,
      lastName,
      country: country ?? '',
      city: city ?? '',
      professionalSummary: professionalSummary ?? '',
      interests: interests ?? {},
      languages: languages ?? ''
    }

    fetchData({ userInfo, formData })
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
