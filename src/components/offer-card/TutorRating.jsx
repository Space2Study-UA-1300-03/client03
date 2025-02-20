import { Box, Rating } from '@mui/material'

export default function TutorRating({ rating }) {
  return (
    <Box>
      <Rating value={rating} />
    </Box>
  )
}
