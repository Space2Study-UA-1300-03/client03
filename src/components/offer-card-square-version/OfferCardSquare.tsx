import { Avatar, Box, Typography, Chip, Stack, Divider } from '@mui/material'
import { FC } from 'react'
import { styles } from '~/components/offer-card-square-version/OfferCardSquare.style'
import AppOfferButtonsSquare from './AppOfferButtonsSquare'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import StarIcon from '@mui/icons-material/Star'

interface OfferCardProps {
  avatar?: string
  rating?: number
  author: string
  subjects?: [] | string[]
  proficiencyLevel: string[]
  price?: string | number
  languages?: [] | string[]
  reviews: number
  title: string
}

const OfferCardSquare: FC<OfferCardProps> = ({
  avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  rating = 5,
  author = 'Jennifer W.',
  subjects = ['design'],
  proficiencyLevel = ['beginner', 'advanced'],
  price = 75,
  languages = ['Ukrainian', 'English'],
  reviews = 15,
  title = 'Advanced Quantum Mechanics: Theoretical Concepts, Mathematical Formulations in Modern Physics'
}) => {
  return (
    <Box sx={styles.offerCardSquare}>
      <Box sx={styles.authInfo}>
        <Avatar
          alt='avatar'
          src={avatar}
          sx={{ minWidth: '100px', minHeight: '100px' }}
        />
        <Box>
          <Typography sx={styles.author}> {author} </Typography>
          <Stack direction='row' spacing={1}>
            {languages?.map((item) => {
              return (
                <Chip
                  color='default'
                  key={item}
                  label={item}
                  sx={{ color: '#616161' }}
                  variant='outlined'
                />
              )
            })}
          </Stack>
        </Box>
        <BookmarkBorderOutlinedIcon />
      </Box>
      <Typography sx={styles.titleCard}> {title} </Typography>
      <Divider />
      <Box sx={styles.chipItems}>
        <Typography sx={styles.chipItemsTitle}>subjects:</Typography>
        <Stack direction='row' spacing={0.5}>
          {subjects?.map((item) => {
            return (
              <Chip
                color='default'
                key={item}
                label={item}
                sx={{
                  bgcolor: '#79B26099',
                  color: '#2C4521',
                  textTransform: 'uppercase'
                }}
                variant='filled'
              />
            )
          })}
        </Stack>
      </Box>
      <Box sx={styles.chipItems}>
        <Typography sx={styles.chipItemsTitle}>Level:</Typography>
        <Stack direction='row' spacing={0.5}>
          {proficiencyLevel?.map((item) => {
            return (
              <Chip
                color='default'
                key={item}
                label={item}
                sx={{
                  bgcolor: '#79B26033',
                  color: '#455A64',
                  textTransform: 'uppercase'
                }}
                variant='filled'
              />
            )
          })}
        </Stack>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '360px'
        }}
      >
        <Box>
          <Box>
            <Typography
              sx={{
                fontSize: ' 20px',
                fontWeight: '500',
                textTransform: 'uppercase'
              }}
            >
              {price + ' ' + 'uah'}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: ' 10px',
              fontWeight: '400',
              textTransform: 'uppercase'
            }}
          >
            / hour
          </Typography>
        </Box>
        <Box>
          <Box sx={styles.rating}>
            <StarIcon sx={{ color: '#FFB000' }} />
            <Typography sx={styles.ratingAmount}> {`${rating}`} </Typography>
          </Box>
          <Typography sx={styles.reviews}> {`${reviews} reviews`} </Typography>
        </Box>
      </Box>
      <AppOfferButtonsSquare />
    </Box>
  )
}

export default OfferCardSquare
