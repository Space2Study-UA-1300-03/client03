import { Avatar, Box, Typography, Chip, Stack } from '@mui/material'
import { FC } from 'react'
import { styles } from '~/components/offer-card/OfferCard.styles'
import AppOfferButtons from './AppOfferButtons'
import TutorRating from './TutorRating'
import SaveFavoriteButton from './SaveFavoriteButton'
import { OfferCardProps } from '../offer-cards-list/offer.card.interface'

const OfferCard: FC<OfferCardProps> = ({
  avatar,
  author,
  subjects,
  proficiencyLevel,
  price,
  languages,
  reviews,
  title,
  description,
  rating
}) => {
  return (
    <Box sx={styles.offerCard}>
      <Box sx={styles.authInfo}>
        <Avatar
          alt='avatar'
          src={avatar}
          sx={{ minWidth: '80px', minHeight: '80px' }}
        />
        <Typography sx={styles.author}> {author} </Typography>
        <TutorRating rating={rating} />
        <Typography sx={styles.reviews}> {`${reviews} reviews`} </Typography>
      </Box>
      <Box sx={styles.cardDetails}>
        <Typography sx={styles.titleCard}> {title} </Typography>

        <Stack direction='row' spacing={1}>
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
        <Typography
          overflow='hidden'
          sx={styles.description}
          textOverflow='ellipsis'
          whiteSpace='balance'
        >
          {' '}
          {description}
        </Typography>
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
      <Box>
        <Box sx={{ mb: '30px' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography
              sx={{
                fontSize: ' 20px',
                fontWeight: '500',
                textTransform: 'uppercase'
              }}
            >
              {price + ' ' + 'uah'}
            </Typography>
            <SaveFavoriteButton />
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
        <AppOfferButtons />
      </Box>
    </Box>
  )
}

export default OfferCard
