import NotificationModal from '~/containers/guest-home-page/notification-modal/NotificationModal'
import imgInfo from '~/assets/img/guest-home-page/info.svg'
import { useTranslation } from 'react-i18next'
import { useModalContext } from '~/context/modal-context'

interface InfoPopUpModalProps {
  email: string
}

export default function InfoPopUpModal({ email }: InfoPopUpModalProps) {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()

  return (
    <NotificationModal
      buttonTitle={t('common.confirmButton')}
      description={`${t('signup.confirmEmailMessage')} ${email}. ${t('signup.confirmEmailDesc')}`}
      img={imgInfo}
      onClose={closeModal}
      title={t('signup.confirmEmailTitle')}
    />
  )
}
