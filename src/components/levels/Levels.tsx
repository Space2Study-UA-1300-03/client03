import { useState, useEffect, useCallback } from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import styles from '~/components/levels/Levels.styles'

interface LevelsProps {
  changeFunc: (name: string, value: string[]) => void
}

const Levels: React.FC<LevelsProps> = ({ changeFunc }) => {
  const { t } = useTranslation()

  const [selectedLevels, setSelectedLevels] = useState<string[]>([])

  const levels = [
    t('common.levels.beginner'),
    t('common.levels.intermediate'),
    t('common.levels.advanced'),
    t('common.levels.test preparation'),
    t('common.levels.professional'),
    t('common.levels.specialized')
  ]

  useEffect(() => {
    changeFunc('proficiencyLevel', selectedLevels)
  }, [selectedLevels, changeFunc])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
      setSelectedLevels((prevLevels) =>
        e.target.checked
          ? [...prevLevels, value]
          : prevLevels.filter((level) => level !== value)
      )
    },
    []
  )

  return (
    <FormGroup>
      {levels.map((level, index) => (
        <FormControlLabel
          control={<Checkbox sx={styles.checkbox} />}
          key={index}
          label={<Typography sx={styles.checkbox}>{level}</Typography>}
          onChange={(e) =>
            handleChange(e as React.ChangeEvent<HTMLInputElement>, level)
          }
          value={level}
        />
      ))}
    </FormGroup>
  )
}

export default Levels
