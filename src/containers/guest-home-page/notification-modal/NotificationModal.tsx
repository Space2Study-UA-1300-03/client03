import { FC, ReactElement } from 'react'
import { Box } from '@mui/material'

import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/containers/guest-home-page/notification-modal/NotificationModal.styles'
import imgInfo from '~/assets/img/guest-home-page/info.svg'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface ConfirmEmailModal {
  description: string | ReactElement
  buttonTitle: string
  title: string
  img: string
  userEmail?: string
  onClose: () => void
}

const NotificationModal: FC<ConfirmEmailModal> = ({
  userEmail = 'Your email'
}) => {
  const { t } = useTranslation()
  const nav = useNavigate()

  return (
    <Box sx={styles.root}>
      <ImgTitleDescription
        description={`${t('signup.confirmEmailMessage')}${userEmail}${t('signup.confirmEmailDesc')}`}
        img={imgInfo}
        style={styles.imgTitleDesc}
        title={t('signup.confirmEmailTitle')}
      />
      <AppButton
        onClick={() => {
          nav('/')
        }}
      >
        {t('common.confirmButton')}
      </AppButton>
    </Box>
  )
}

export default NotificationModal
