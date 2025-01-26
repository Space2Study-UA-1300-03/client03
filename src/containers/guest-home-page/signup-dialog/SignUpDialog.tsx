import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import SignUpForm from '~/containers/guest-home-page/signup-form/SignUpForm'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'

import tutorImg from '~/assets/img/signup-dialog/tutor.svg'
import studentImg from '~/assets/img/signup-dialog/student.svg'
import styles from './SignUpDialog.styles'
import useForm from '~/hooks/use-form'
import { signup } from '~/constants'
import { FormData } from '~/types/common/interfaces/common.interfaces'

import { SignUpDialogProps } from '~/types/containers/guest-home-page/signup-dialog/SignUpDialog.types'
import { UserRoleEnum } from '~/types'

const SignUpDialog: FC<SignUpDialogProps> = ({ initialRole }) => {
  const { t } = useTranslation()

  const { handleSubmit, handleInputChange, handleBlur, data, errors } =
    useForm<FormData>({
      // eslint-disable-next-line @typescript-eslint/require-await
      onSubmit: async (data?: FormData): Promise<void> => {
        console.log('Form submitted', data)
      },
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      validations: {
        email: (value: string) =>
          value.includes('@') ? '' : 'Invalid email address',
        password: (value: string) =>
          value.length >= 6 ? '' : 'Password must be at least 6 characters',
        confirmPassword: (value: string, allValues: FormData) =>
          value === allValues.password ? '' : 'Passwords do not match'
      }
    })

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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
