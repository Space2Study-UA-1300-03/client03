import { useTranslation } from 'react-i18next'
import { useCallback, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import LoginForm from '~/containers/guest-home-page/login-form/LoginForm'
import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import { useLoginMutation } from '~/services/auth-service'
import { useModalContext, CLOSE_EVENT_KEY } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { email, password } from '~/utils/validations/login'
import loginImg from '~/assets/img/login-dialog/login.svg'
import { login, snackbarVariants } from '~/constants'

import styles from '~/containers/guest-home-page/login-dialog/LoginDialog.styles'

const LoginDialog = () => {
  const { t } = useTranslation()
  const { closeModal, registerEvent, unregisterEvent } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const [loginUser] = useLoginMutation()
  const { openDialog } = useConfirm()

  const closeConfirmation = useCallback(
    (isConfirmed) => {
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

  const {
    handleSubmit,
    handleInputChange,
    handleBlur,
    data,
    errors,
    isFormValid,
    isDirty
  } = useForm({
    onSubmit: async () => {
      try {
        await loginUser(data).unwrap()
        closeModal(true)
      } catch (e) {
        setAlert({
          severity: snackbarVariants.error,
          message: `errors.${e?.data?.code}`
        })
      }
    },
    dirtyOnChange: true,
    initialValues: { email: '', password: '' },
    validations: { email, password }
  })

  useEffect(() => {
    registerEvent(CLOSE_EVENT_KEY, () => {
      if (isDirty) return onDelete()
      return true
    })

    return function () {
      unregisterEvent(CLOSE_EVENT_KEY)
    }
  }, [isDirty, registerEvent, unregisterEvent, onDelete])

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box alt='login' component='img' src={loginImg} sx={styles.img} />
      </Box>

      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h2'>
          {t('login.head')}
        </Typography>
        <Box sx={styles.form}>
          <LoginForm
            data={data}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
            handleSubmit={handleSubmit}
            isFormValid={!isFormValid}
          />
          <GoogleLogin buttonWidth={styles.form.maxWidth} type={login} />
        </Box>
      </Box>
    </Box>
  )
}

export default LoginDialog
