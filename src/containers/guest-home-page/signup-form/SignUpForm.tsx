import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import useInputVisibility from '~/hooks/use-input-visibility'
import Box from '@mui/material/Box'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'

import { styles } from './SignUpForm.styles'
import { SignUpFormProps } from '~/types/containers/guest-home-page/signup-form/SignUpForm.types'

const SignUpForm: FC<SignUpFormProps> = ({
  handleSubmit,
  handleChange,
  handleBlur,
  data,
  errors
}) => {
  const { t } = useTranslation()

  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password)
  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibility(errors.confirmPassword)

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <Box sx={styles.nameFieldsContainer}>
        <AppTextField
          autoFocus
          errorMsg={t(errors.firstName || '')}
          label={t('common.labels.firstName')}
          onBlur={handleBlur('firstName')}
          onChange={handleChange('firstName')}
          required
          sx={styles.halfWidth}
          value={data.firstName}
        />
        <AppTextField
          errorMsg={t(errors.lastName || '')}
          label={t('common.labels.lastName')}
          onBlur={handleBlur('lastName')}
          onChange={handleChange('lastName')}
          required
          sx={styles.halfWidth}
          value={data.lastName}
        />
      </Box>
      <AppTextField
        errorMsg={t(errors.email || '')}
        fullWidth
        label={t('common.labels.email')}
        onBlur={handleBlur('email')}
        onChange={handleChange('email')}
        required
        value={data.email}
      />
      <AppTextField
        InputProps={passwordVisibility}
        errorMsg={t(errors.password || '')}
        fullWidth
        label={t('common.labels.password')}
        onBlur={handleBlur('password')}
        onChange={handleChange('password')}
        required
        type={showPassword ? 'text' : 'password'}
        value={data.password}
      />
      <AppTextField
        InputProps={confirmPasswordVisibility}
        errorMsg={t(errors.confirmPassword || '')}
        fullWidth
        label={t('common.labels.confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        onChange={handleChange('confirmPassword')}
        required
        type={showConfirmPassword ? 'text' : 'password'}
        value={data.confirmPassword}
      />
      <Box sx={styles.agreeTerms}>
        <Checkbox required />
        <Typography variant='body2'>
          {t('signup.iAgree')}{' '}
          <a href='#' style={styles.link}>
            {t('signup.terms')}
          </a>{' '}
          {t('signup.and')}{' '}
          <a href='#' style={styles.link}>
            {t('signup.privacyPolicy')}
          </a>
        </Typography>
      </Box>
      <AppButton sx={styles.submitButton} type='submit'>
        {t('signup.submit')}
      </AppButton>
    </Box>
  )
}

export default SignUpForm
