/* eslint-disable @typescript-eslint/no-unsafe-call */
import { FC, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import SignUpForm from '~/containers/guest-home-page/signup-form/SignUpForm'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import { useModalContext, CLOSE_EVENT_KEY } from '~/context/modal-context'

import tutorImg from '~/assets/img/signup-dialog/tutor.svg'
import studentImg from '~/assets/img/signup-dialog/student.svg'
import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import { signup } from '~/constants'
import { FormData } from '~/types/common/interfaces/common.interfaces'
import {
  firstName,
  lastName,
  email,
  password,
  confirmPassword
} from '~/utils/validations/signUp'

import { SignUpDialogProps } from '~/types/containers/guest-home-page/signup-dialog/SignUpDialog.types'
import { UserRoleEnum } from '~/types'
import { useSignUpMutation } from '~/services/auth-service'

import styles from './SignUpDialog.styles'

const SignUpDialog: FC<SignUpDialogProps> = ({ initialRole }) => {
  const { t } = useTranslation()
  const { closeModal, registerEvent, unregisterEvent } = useModalContext()
  const { openDialog } = useConfirm()
  const [signUp] = useSignUpMutation()

  const closeConfirmation = useCallback(
    (isConfirmed: boolean) => {
      if (isConfirmed) closeModal(true)
    },
    [closeModal]
  )

  const onDelete = useCallback(() => {
    openDialog({
      title: t('titles.confirmTitle'),
      message: t('questions.unsavedChanges'),
      sendConfirm: (isConfirmed) => closeConfirmation(isConfirmed)
    })
  }, [openDialog, t, closeConfirmation])

  const { handleSubmit, handleInputChange, handleBlur, data, errors, isDirty } =
    useForm<FormData>({
      onSubmit: async (data?: FormData): Promise<void> => {
        if (!data) return

        try {
          await signUp({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            role:
              initialRole === UserRoleEnum.Tutor
                ? UserRoleEnum.Tutor
                : UserRoleEnum.Student
          }).unwrap()

          alert('Registration successful!')
          closeModal(true)
        } catch (err) {
          console.error('Registration error:', err)
        }
      },
      dirtyOnChange: true,
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      validations: {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      }
    })

  useEffect(() => {
    registerEvent(CLOSE_EVENT_KEY, () => {
      if (isDirty) return onDelete()
      return true
    })

    return () => {
      unregisterEvent(CLOSE_EVENT_KEY)
    }
  }, [isDirty, registerEvent, unregisterEvent, onDelete])

  const headingText =
    initialRole === UserRoleEnum.Tutor
      ? t('signup.head.tutor')
      : t('signup.head.student')

  const imageSrc = initialRole === UserRoleEnum.Tutor ? tutorImg : studentImg

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box alt='signup' component='img' src={imageSrc} sx={styles.img} />
      </Box>
      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h2'>
          {headingText}
        </Typography>
        <SignUpForm
          data={data}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <GoogleLogin
          buttonWidth={styles.form.maxWidth}
          role={initialRole}
          type={signup}
        />
      </Box>
    </Box>
  )
}

export default SignUpDialog
