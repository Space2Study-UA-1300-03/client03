import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import LanguageIcon from '@mui/icons-material/Language'
import Button from '@mui/material/Button'

import { supportedLngs } from '~/plugins/i18n'

import { styles } from '~/components/language-switcher/LanguageSwitcher.styles'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = !!anchorEl
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCLick = (code: string) => {
    localStorage.setItem('i18nextLng', code)
    i18n
      .changeLanguage(code)
      .then(() => handleClose())
      .catch((error) => console.error('Language change failed:', error))
  }

  return (
    <div>
      <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        aria-label='Change language'
        id='basic-button'
        onClick={handleClickListItem}
        sx={styles.languageIcon}
      >
        <LanguageIcon />
      </Button>
      <Menu
        MenuListProps={{
          role: 'listbox',
          'aria-labelledby': 'lock-button'
        }}
        anchorEl={anchorEl}
        id='lock-menu'
        onClose={handleClose}
        open={open}
      >
        {Object.entries(supportedLngs).map(([code, name]) => (
          <MenuItem
            key={code}
            onClick={() => handleCLick(code)}
            selected={code === i18n.resolvedLanguage}
          >
            {name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default LanguageSwitcher
