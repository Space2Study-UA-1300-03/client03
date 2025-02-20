import { FC, useEffect, useState, useCallback } from 'react'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '~/hooks/use-redux'
import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'

import { markFirstLoginComplete } from '~/redux/reducer'

import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import { useModalContext, CLOSE_EVENT_KEY } from '~/context/modal-context'
import useAxios from '~/hooks/use-axios'
import { userService } from '~/services/user-service'

import StepWrapper from '~/components/step-wrapper/StepWrapper'

import {
  tutorStepLabels,
  studentStepLabels,
  initialValues,
  validations
} from '~/components/user-steps-wrapper/constants'
import { student } from '~/constants'

interface UserStepsWrapperProps {
  userRole: string
}

interface UserData {
  firstName?: string
  lastName?: string
}

const UserStepsWrapper: FC<UserStepsWrapperProps> = ({ userRole }) => {
  const stepLabels = userRole === student ? studentStepLabels : tutorStepLabels
  const [isUserFetched, setIsUserFetched] = useState(false)
  const dispatch = useAppDispatch()
  const { closeModal, registerEvent, unregisterEvent } = useModalContext()
  const { openDialog } = useConfirm()
  const { t } = useTranslation()

  const closeConfirmation = useCallback(
    (isConfirmed: boolean) => {
      if (isConfirmed) closeModal(true)
    },
    [closeModal]
  )

  const onClose = useCallback(() => {
    openDialog({
      title: t('titles.confirmTitle'),
      message: t('questions.unsavedChanges'),
      sendConfirm: (isConfirmed) => closeConfirmation(isConfirmed)
    })
  }, [openDialog, t, closeConfirmation])

  const {
    handleInputChange,
    handleNonInputValueChange,
    handleBlur,
    data,
    handleDataChange,
    errors,
    isDirty,
    validateData
  } = useForm({
    dirtyOnChange: true,
    initialValues: initialValues,
    validations: validations
  })

  const userData = useAxios({
    service: userService.getMe,
    defaultResponse: null,
    fetchOnMount: true
  }).response as UserData | null

  useEffect(() => {
    if (!userData) return

    handleDataChange({
      firstName: userData.firstName || '',
      lastName: userData.lastName || ''
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  useEffect(() => {
    registerEvent(CLOSE_EVENT_KEY, () => {
      if (isDirty) return onClose()
      return true
    })

    return () => {
      unregisterEvent(CLOSE_EVENT_KEY)
    }
  }, [isDirty, registerEvent, unregisterEvent, onClose])

  useEffect(() => {
    dispatch(markFirstLoginComplete())
  }, [dispatch])

  const childrenArr = [
    <GeneralInfoStep
      data={data}
      errors={errors}
      handleBlur={handleBlur}
      handleChange={handleInputChange}
      handleDataChange={handleDataChange}
      handleNonInputValueChange={handleNonInputValueChange}
      isUserFetched={isUserFetched}
      key='1'
      setIsUserFetched={setIsUserFetched}
    />,
    <SubjectsStep
      data={data}
      handleSubjectChange={handleNonInputValueChange}
      key='2'
    />,
    <LanguageStep
      data={data}
      handleLanguageChange={handleNonInputValueChange}
      key='3'
      userRole={userRole}
    />,
    <AddPhotoStep data={data} handlePhotoChange={handleDataChange} key='4' />
  ]

  return (
    <Box component='form'>
      <StepWrapper
        data={data}
        errors={errors}
        steps={stepLabels}
        validateData={validateData}
      >
        {childrenArr}
      </StepWrapper>
    </Box>
  )
}

export default UserStepsWrapper
