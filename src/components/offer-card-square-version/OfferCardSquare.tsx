import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar, Box, Typography, Chip, Stack, Divider } from '@mui/material'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import StarIcon from '@mui/icons-material/Star'

import AppOfferButtonsSquare from './AppOfferButtonsSquare'
import { OfferCardProps } from '../offer-cards-list/offer.card.interface'

import { styles } from '~/components/offer-card-square-version/OfferCardSquare.style'

const OfferCardSquare: FC<OfferCardProps> = ({ cardData }) => {
  const {
    avatar,
    rating,
    author,
    subjects,
    proficiencyLevel,
    price,
    languages,
    reviews,
    title
  } = cardData
  const { t } = useTranslation()
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
          <Stack
            direction='row'
            display='grid'
            gap='2px'
            gridTemplateColumns='repeat(2, 1fr)'
            gridTemplateRows='auto'
            spacing={1}
          >
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
        <Typography sx={styles.chipItemsTitle}>
          {t('findOfferPage.subject')}:
        </Typography>
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
        <Typography sx={styles.chipItemsTitle}>
          {t('findOfferPage.level')}:
        </Typography>
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
              {price} {t('findOfferPage.priceCurrange')}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: ' 10px',
              fontWeight: '400',
              textTransform: 'uppercase'
            }}
          >
            / {t('findOfferPage.hour')}
          </Typography>
        </Box>
        <Box>
          <Box sx={styles.rating}>
            <StarIcon sx={{ color: '#FFB000' }} />
            <Typography sx={styles.ratingAmount}> {`${rating}`} </Typography>
          </Box>
          <Typography sx={styles.reviews}>
            {' '}
            {`${reviews} ${t('findOfferPage.reviews')}`}{' '}
          </Typography>
        </Box>
      </Box>
      <AppOfferButtonsSquare />
    </Box>
  )
}

export default OfferCardSquare
