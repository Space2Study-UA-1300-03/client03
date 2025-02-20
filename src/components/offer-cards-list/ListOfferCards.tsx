import { Box } from '@mui/material'
import OfferCard from '../offer-card/OfferCard'
import { offerDataMock } from './offerDataMock'
import OfferCardSquare from '../offer-card-square-version/OfferCardSquare'

const ListOfferCard = ({ isSquareVersion = true }) => {
  return (
    <Box
      sx={
        isSquareVersion == false
          ? {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              m: '100px'
            }
          : {
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'auto',
              m: '0 100px'
            }
      }
    >
      {isSquareVersion === false &&
        offerDataMock.map((data) => (
          <OfferCard
            author={data.author}
            avatar={data.avatar}
            description={data.description}
            key={data.id}
            languages={data.languages}
            price={data.price}
            proficiencyLevel={data.proficiencyLevel}
            rating={data.rating}
            reviews={data.reviews}
            subjects={data.subjects}
            title={data.title}
          />
        ))}

      {isSquareVersion === true &&
        offerDataMock.map((data) => (
          <OfferCardSquare
            author={data.author}
            avatar={data.avatar}
            description={data.description}
            key={data.id}
            languages={data.languages}
            price={data.price}
            proficiencyLevel={data.proficiencyLevel}
            rating={data.rating}
            reviews={data.reviews}
            subjects={data.subjects}
            title={data.title}
          />
        ))}
    </Box>
  )
}

export default ListOfferCard
