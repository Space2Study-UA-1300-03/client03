import Box from '@mui/material/Box'
import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/containers/email-confirm-modal/EmailConfirmModal.styles'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import imgSuccess from '~/assets/img/email-confirmation-modals/success-icon.svg'
import { useTranslation } from 'react-i18next'

const EmailConfirmPopupSuccess = () => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.box}>
      <ImgTitleDescription
        img={imgSuccess}
        style={styles}
        title={t('modals.emailConfirm')}
      />
      <AppButton onClick={`openLoginDialog`}>{t('button.goToLogin')}</AppButton>
    </Box>
  )
}

export default EmailConfirmPopupSuccess
