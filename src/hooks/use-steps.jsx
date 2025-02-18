import { useState } from 'react'
import useAxios from '~/hooks/use-axios'

import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { userService } from '~/services/user-service'
import { snackbarVariants } from '~/constants'
import { tabMap } from '~/components/user-steps-wrapper/constants'

const useSteps = ({ steps, data }) => {
  const [activeStep, setActiveStep] = useState(0)
  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const isLastStep = activeStep === steps.length - 1

  const updateUser = (params) => {
    const { userInfo, formData } = params
    const requests = [userService.updateUser(userInfo)]

    if (formData) requests.push(userService.updateUserPhoto(formData))
    return Promise.all(requests)
  }

  const stepErrors = (errors) => {
    if (!errors) return []
    const result = {}

    Object.keys(errors).forEach((field) => {
      const tab = Object.keys(tabMap).find((key) => tabMap[key].includes(field))
      if (tab) {
        result[tab] = result[tab] || []
        result[tab].push(errors[field])
      }
    })

    return Object.keys(tabMap).map((tab) => {
      return result[tab] && result[tab].some((error) => error)
    })
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

  const next = () => {
    setActiveStep((prev) => prev + 1)
  }

  const back = () => {
    setActiveStep((prev) => prev - 1)
  }

  const handleSubmit = () => {
    const {
      firstName,
      lastName,
      country,
      city,
      professionalSummary,
      languages,
      photoFile,
      interests
    } = data
    const hasPhoto = photoFile && photoFile.length > 0
    let formData

    if (hasPhoto) {
      formData = new FormData()
      formData.append('photo', photoFile[0])
    }

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
  }

  const stepOperation = {
    next,
    back,
    handleSubmit,
    setActiveStep
  }

  return { activeStep, isLastStep, stepOperation, loading, stepErrors }
}

export default useSteps
