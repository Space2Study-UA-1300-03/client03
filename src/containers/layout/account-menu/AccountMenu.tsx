import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import MenuItem from '@mui/material/MenuItem'

import AppMenu from '~/components/app-menu/AppMenu'
import { authRoutes } from '~/router/constants/authRoutes'
import LinkWithScroll from '~/components/link-with-scroll/LinkWithScroll'

import { styles } from '~/containers/layout/account-menu/AccountMenu.styles'

interface AccountMenuProps {
  anchorEl: Element | null
  onClose: () => void
}

const AccountMenu: FC<AccountMenuProps> = ({ anchorEl, onClose }) => {
  const { t } = useTranslation()

  const menuList = Object.values(authRoutes.accountMenu).map((item) => (
    <MenuItem key={item.path} onClick={onClose} sx={styles.menuItem}>
      <LinkWithScroll sx={styles.menuLink} to={item.path}>
        {t(`header.${item.route}`)}
      </LinkWithScroll>
    </MenuItem>
  ))

  return (
    <AppMenu
      anchorEl={anchorEl}
      menuList={menuList}
      onClose={onClose}
      open={Boolean(anchorEl)}
    />
  )
}

export default AccountMenu
