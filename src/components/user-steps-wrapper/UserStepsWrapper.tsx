import { FC, useEffect, useState } from 'react'
import Box from '@mui/material/Box'

import { useAppDispatch } from '~/hooks/use-redux'
import useForm from '~/hooks/use-form'

import { markFirstLoginComplete } from '~/redux/reducer'

import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'

import StepWrapper from '~/components/step-wrapper/StepWrapper'

// import { useSnackBarContext } from '~/context/snackbar-context'
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

const UserStepsWrapper: FC<UserStepsWrapperProps> = ({ userRole }) => {
  const stepLabels = userRole === student ? studentStepLabels : tutorStepLabels
  // const { setAlert } = useSnackBarContext()
  const [isUserFetched, setIsUserFetched] = useState(false)
  const dispatch = useAppDispatch()

  const {
    handleInputChange,
    handleNonInputValueChange,
    handleBlur,
    data,
    handleDataChange,
    errors
    // isDirty
  } = useForm({
    dirtyOnChange: true,
    initialValues: initialValues,
    validations: validations
  })

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
      <StepWrapper data={data} steps={stepLabels}>
        {childrenArr}
      </StepWrapper>
    </Box>
  )
}

export default UserStepsWrapper
