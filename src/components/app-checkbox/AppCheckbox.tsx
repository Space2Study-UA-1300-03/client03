import { useTranslation } from 'react-i18next'
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Tooltip,
  CheckboxProps
} from '@mui/material'

import { TypographyVariantEnum } from '~/types'

import { styles } from '~/components/app-checkbox/AppCheckbox.styles'

interface AppCheckboxProps extends CheckboxProps {
  errormsg?: string
  label: string
}

const AppCheckbox: React.FC<AppCheckboxProps> = ({
  errormsg,
  label,
  ...props
}) => {
  const { t } = useTranslation()

  const helperText = errormsg ? (
    <Tooltip sx={styles.error} title={errormsg}>
      <Typography variant={TypographyVariantEnum.Caption}>
        {errormsg}
      </Typography>
    </Tooltip>
  ) : (
    ' '
  )

  return (
    <Box>
      <Box sx={styles.wrapper}>
        <FormControlLabel
          control={
            <Checkbox
              required
              sx={{ color: errormsg ? 'error.main' : undefined }}
              {...props}
            />
          }
          label={label}
        />
        {helperText}
      </Box>
      <Typography sx={styles.requiredField}>
        {t('becomeTutor.generalInfo.helperText')}
      </Typography>
    </Box>
  )
}

export default AppCheckbox
