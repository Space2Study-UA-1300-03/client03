import { Box } from '@mui/material'

import OfferCard from '../offer-card/OfferCard'
import { offerDataMock } from './offerDataMock'
import OfferCardSquare from '../offer-card-square-version/OfferCardSquare'

import { styles } from '~/components/offer-cards-list/ListOfferCards.style'

interface ListOfferCardProps {
  cardView: 'grid' | 'single'
}

const ListOfferCard: React.FC<ListOfferCardProps> = ({ cardView }) => {
  return (
    <Box
      sx={
        cardView === 'grid' ? styles.gridCardWrapper : styles.singleCardWrapper
      }
    >
      {offerDataMock?.map((data, index) => (
        <Box key={index}>
          {cardView === 'grid' ? (
            <OfferCardSquare cardData={data} />
          ) : (
            <OfferCard cardData={data} />
          )}
        </Box>
      ))}
    </Box>
  )
}

export default ListOfferCard
