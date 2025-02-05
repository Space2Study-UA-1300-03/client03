import { useTranslation } from 'react-i18next'

import TitleBlock from '~/components/title-block/TitleBlock'
import icon from '~/assets/img/find-offer/subject_icon.png'
import AppButton from '~/components/app-button/AppButton'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useDrawer } from '~/hooks/use-drawer'
import { translationKey } from '~/containers/find-offer/constants'
import { useAppSelector } from '~/hooks/use-redux'
import AppDrawer from '~/components/app-drawer/AppDrawer'

const OfferRequestBlock = () => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const { userRole } = useAppSelector((state) => state.appMain)

  const handleOpenDrawer = () => {
    openDrawer()
  }

  return (
    <TitleBlock img={icon} translationKey={translationKey}>
      <AppButton
        fullWidth={isMobile}
        onClick={handleOpenDrawer}
        sx={{ py: '14px' }}
      >
        {t(`${translationKey}.button.${userRole}`)}
      </AppButton>
      <AppDrawer onClose={closeDrawer} open={isOpen} />
    </TitleBlock>
  )
}

export default OfferRequestBlock
