import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useModalContext } from '~/context/modal-context'
import { AuthService } from '~/services/auth-service'
import useAxios from '~/hooks/use-axios'
import Loader from '~/components/loader/Loader'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import imgReject from '~/assets/img/email-confirmation-modals/not-success-icon.svg'
import NotificationModal from '../guest-home-page/notification-modal/NotificationModal'
import imgSuccess from '~/assets/img/email-confirmation-modals/success-icon.svg'

const EmailConfirmModal = ({ confirmToken, openModal }) => {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()

  const serviceFunction = useCallback(
    () => AuthService.confirmEmail(confirmToken),
    [confirmToken]
  )

  const { response, error, loading } = useAxios({
    service: serviceFunction,
    defaultResponse: null
  })

  const openLoginDialog = () => {
    openModal({ component: <LoginDialog /> })
  }

  if (loading) {
    return <Loader size={100} />
  }

  if (response) {
    return (
      <NotificationModal
        buttonTitle={t('button.goToLogin')}
        img={imgSuccess}
        onClose={openLoginDialog}
        title={t('modals.emailConfirm')}
      />
    )
  }

  if (
    (error && error.code === 'BAD_CONFIRM_TOKEN') ||
    (error && error.code === 'DOCUMENT_NOT_FOUND' && response === null)
  ) {
    return (
      <NotificationModal
        buttonTitle={t('common.confirmButton')}
        description={t('modals.emailReject.badToken')}
        img={imgReject}
        onClose={closeModal}
        title={t('modals.emailNotConfirm')}
      />
    )
  }

  if (error && error.code === 'EMAIL_ALREADY_CONFIRMED') {
    return (
      <NotificationModal
        buttonTitle={t('common.confirmButton')}
        description={t('modals.emailReject.alreadyConfirmed')}
        img={imgReject}
        onClose={closeModal}
        title={t('modals.emailAlreadyConfirm')}
      />
    )
  }
}

export default EmailConfirmModal
