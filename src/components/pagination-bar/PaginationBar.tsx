import { FC } from 'react'
import { Box, Button } from '@mui/material'
import {
  paginationContainer,
  arrowButtonSx,
  pageButtonSx
} from './ PaginationBar.styles'

interface PaginationBarProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const PaginationBar: FC<PaginationBarProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (totalPages <= 1) return null

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const visiblePages: number[] = []
  const maxVisible = 3
  const start = Math.max(2, currentPage - maxVisible)
  const end = Math.min(totalPages - 1, currentPage + maxVisible)

  visiblePages.push(1)
  if (start > 2) {
    visiblePages.push(-1) // "..."
  }
  for (let i = start; i <= end; i++) {
    if (i > 1 && i < totalPages) {
      visiblePages.push(i)
    }
  }
  if (end < totalPages - 1) {
    visiblePages.push(-1) // "..."
  }
  if (totalPages > 1) {
    visiblePages.push(totalPages)
  }

  return (
    <Box sx={paginationContainer}>
      <Button
        disabled={currentPage === 1}
        onClick={handlePrev}
        sx={arrowButtonSx}
      >
        &lt;
      </Button>

      {visiblePages.map((p, idx) => {
        if (p === -1) {
          return (
            <Box
              key={`ellipsis-${idx}`}
              sx={{ minWidth: '32px', textAlign: 'center', color: '#757575' }}
            >
              ...
            </Box>
          )
        }
        const isActive = p === currentPage
        return (
          <Button
            key={p}
            onClick={() => onPageChange(p)}
            sx={pageButtonSx(isActive)}
          >
            {p}
          </Button>
        )
      })}

      <Button
        disabled={currentPage === totalPages}
        onClick={handleNext}
        sx={arrowButtonSx}
      >
        &gt;
      </Button>
    </Box>
  )
}

export default PaginationBar
