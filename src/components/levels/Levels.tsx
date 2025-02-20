import { useState, useEffect } from 'react'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import styles from '~/components/levels/Levels.styles'

interface LevelsProps {
  changeFunc: (name: string, value: string) => void
}

const Levels: React.FC<LevelsProps> = ({ changeFunc }) => {
  const { t } = useTranslation()

  const levels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Test Preparation',
    'Professional',
    'Specialized'
  ]

  const [selectedLevel, setSelectedLevel] = useState<string>('')

  useEffect(() => {
    changeFunc('proficiencyLevel', selectedLevel)
  }, [selectedLevel, changeFunc])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLevel(event.target.value)
  }

  return (
    <FormControl component='fieldset'>
      <RadioGroup onChange={handleChange} value={selectedLevel}>
        {levels.map((level, index) => (
          <FormControlLabel
            control={<Radio sx={styles.radio} />}
            key={index}
            label={
              <Typography sx={styles.checkbox}>
                {t(`common.levels.${level.toLowerCase().replace(/\s+/g, '')}`)}
              </Typography>
            }
            value={level}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export default Levels
