import { SxProps, Theme } from '@mui/material/styles'

interface LevelsStyles {
  radio: SxProps<Theme>
  checkbox: SxProps<Theme>
}

const styles: LevelsStyles = {
  radio: {
    padding: '5px'
  },
  checkbox: {
    padding: '5px'
  }
}

export default styles
