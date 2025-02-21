import { useEffect } from 'react'
import Container from '@mui/material/Container'

import { useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import FindBlock from '~/components/find-block/FindBlock'
import Faq from '~/containers/faq/Faq'
import UserHowItWorks from '~/containers/user-how-it-works/UserHowItWorks.jsx'

import { translationKey } from '~/components/find-block/find-tutor-constants'
import PopularCategories from '~/components/popular-categories/PopularCategories'

const StudentHome = () => {
  const { openModal } = useModalContext()
  const { isFirstLogin, userRole } = useAppSelector((state) => state.appMain)

  useEffect(() => {
    if (isFirstLogin) {
      openModal({
        component: <UserStepsWrapper userRole={userRole} />,
        paperProps: {
          sx: {
            maxHeight: { sm: '652px' },
            height: '100%',
            maxWidth: '1130px',
            width: '100%'
          }
        }
      })
    }
  }, [openModal, isFirstLogin, userRole])

  return (
    <Container data-testid='studentHome' sx={{ flex: 1 }}>
      <FindBlock translationKey={translationKey} />
      <PopularCategories />
      <UserHowItWorks userRole={userRole} />
      <Faq userRole={userRole} />
    </Container>
  )
}

export default StudentHome
