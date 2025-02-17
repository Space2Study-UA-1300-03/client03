import { Container } from '@mui/material'
import OfferCard from '../offer-card/OfferCard'

const offerDataMock = [
  {
    id: '1',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: [1, 5, 3, 2],
    author: 'Jennifer W.',
    subjects: ['design'],
    proficiencyLevel: ['beginner'],
    price: 75,
    languages: ['Ukrainian', 'English'],
    reviews: 15,
    title:
      'Advanced Quantum Mechanics: Theoretical Concepts, Mathematical Formulations in Modern Physics',
    description:
      'Hello. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don Hello. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in s'
  },
  {
    id: '2',
    avatar:
      'https://images.unsplash.com/photo-1699107769235-902ff97e93f3?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: [1, 5, 5, 1],
    author: 'Jenni ',
    subjects: ['chemistry'],
    proficiencyLevel: ['advanced'],
    price: 50,
    languages: ['Ukrainian', 'Germany', 'Polish'],
    reviews: 25,
    title:
      'Advanced Quantum Mechanics: Theoretical Concepts, Mathematical Formulations in Modern Physics',
    description:
      'Hello. There are many variations of passages of Lorem Ipsum available'
  }
]

const ListOfferCard = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {offerDataMock.map((data) => (
        <OfferCard
          author={data.author}
          avatar={data.avatar}
          description={data.description}
          key={data.id}
          languages={data.languages}
          price={data.price}
          proficiencyLevel={data.proficiencyLevel}
          reviews={data.reviews}
          subjects={data.subjects}
          title={data.title}
        />
      ))}
    </Container>
  )
}

export default ListOfferCard
