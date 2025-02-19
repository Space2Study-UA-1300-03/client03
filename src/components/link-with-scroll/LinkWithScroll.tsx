import { ReactNode, useCallback, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'

import HashLink from '~/components/hash-link/HashLink'
import { styles } from '~/components/link-with-scroll/LinkWithScroll.styles'

interface LinkWithScrollProps {
  to: string
  children: ReactNode
  sx?: object
}

const LinkWithScroll = memo(({ to, children, sx }: LinkWithScrollProps) => {
  const { pathname } = useLocation()
  const hasHash = to.includes('#')

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (pathname === to) {
        e.preventDefault()
        const scrollContainer = document.querySelectorAll(
          '[data-element="scroll-container"]'
        )
        scrollContainer[0]?.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    [pathname, to]
  )

  const Component = hasHash ? HashLink : Link

  return (
    <Box
      component={Component}
      onClick={handleClick}
      sx={{ ...styles.link, ...sx }}
      to={to}
    >
      {children}
    </Box>
  )
})

LinkWithScroll.displayName = 'LinkWithScroll'

export default LinkWithScroll
