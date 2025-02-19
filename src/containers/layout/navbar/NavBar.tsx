import { Fragment, useMemo } from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import LinkWithScroll from '~/components/link-with-scroll/LinkWithScroll'
import Logo from '~/containers/logo/Logo'
import Sidebar from '~/containers/layout/sidebar/Sidebar'
import NavigationIcons from '~/containers/navigation-icons/NavigationIcons'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import useMenu from '~/hooks/use-menu'
import { useDrawer } from '~/hooks/use-drawer'
import { useAppSelector } from '~/hooks/use-redux'
import { guestRoutes } from '~/router/constants/guestRoutes'
import {
  tutorRoutes,
  findOffersChildRoutes
} from '~/router/constants/tutorRoutes'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { authRoutes } from '~/router/constants/authRoutes'

import { UserRoleEnum } from '~/types'
import { styles } from '~/containers/layout/navbar/NavBar.styles'

const Navbar = () => {
  const { userRole } = useAppSelector((state) => state.appMain)
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const { openMenu, renderMenu, closeMenu, anchorEl } = useMenu()
  const { pathname } = useLocation()
  const { t } = useTranslation()

  const isChildRouteActive = findOffersChildRoutes.some((childRoute) =>
    Boolean(matchPath(childRoute.path, pathname))
  )

  const navigationItems = useMemo(() => {
    if (userRole === UserRoleEnum.Student) {
      return Object.values(studentRoutes.navBar)
    } else if (userRole === UserRoleEnum.Tutor) {
      return Object.values(tutorRoutes.navBar)
    }
    return Object.values(guestRoutes.navBar)
  }, [userRole])

  const accountItems = useMemo(() => {
    if (!userRole) return []
    return Object.values(authRoutes.accountMenu)
  }, [userRole])

  const handleOpenSidebar = () => {
    openDrawer()
  }

  const findOffersMenu = findOffersChildRoutes.map((childRoute) => (
    <MenuItem key={childRoute.route} onClick={closeMenu} sx={styles.menuItem}>
      <LinkWithScroll sx={styles.findOfferMenuItem} to={childRoute.path}>
        {t(`header.${childRoute.route}`)}
      </LinkWithScroll>
    </MenuItem>
  ))

  const navigationList = navigationItems.map((item, idx, array) => {
    const isLast = array.length - 1 === idx
    const isActive = Boolean(matchPath(item.path, pathname))

    return (
      <Fragment key={item.route}>
        {item.route === tutorRoutes.navBar.findOffers.route ? (
          <ListItem onClick={openMenu} sx={styles.listItem}>
            <Typography sx={styles.navItemText(isChildRouteActive)}>
              {t(`header.${item.route}`)}
            </Typography>
            <KeyboardArrowDownIcon sx={styles.arrowIcon(Boolean(anchorEl))} />
          </ListItem>
        ) : (
          <ListItem sx={styles.menuItem}>
            <LinkWithScroll
              sx={{ ...styles.navItemText(isActive), ...styles.menuLink }}
              to={item.path}
            >
              {t(`header.${item.route}`)}
            </LinkWithScroll>
          </ListItem>
        )}
        {!isLast && <Typography sx={styles.divider}>{'/'}</Typography>}
      </Fragment>
    )
  })

  return (
    <Box sx={styles.header}>
      <Box sx={styles.logoButton}>
        <LinkWithScroll
          to={
            guestRoutes[userRole as UserRoleEnum]?.route ||
            guestRoutes.home.route
          }
        >
          <Logo />
        </LinkWithScroll>
      </Box>
      {renderMenu(findOffersMenu, { autoFocus: false })}
      <List sx={styles.navList}>{navigationList}</List>
      <NavigationIcons setSidebarOpen={handleOpenSidebar} />
      <AppDrawer onClose={closeDrawer} open={isOpen}>
        <Sidebar
          accountItems={accountItems}
          navigationItems={navigationItems}
          onClose={closeDrawer}
        />
      </AppDrawer>
    </Box>
  )
}

export default Navbar
