export const paginationContainer = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
}

export const arrowButtonSx = {
  minWidth: '32px',
  minHeight: '32px',
  borderRadius: '50%',
  backgroundColor: '#F5F5F5',
  color: '#757575',
  padding: 0,
  minHeightAuto: 0,
  '&:hover': {
    backgroundColor: '#E0E0E0'
  },
  '&:disabled': {
    backgroundColor: '#F5F5F5',
    opacity: 0.6
  }
}

export const pageButtonSx = (isActive: boolean) => ({
  minWidth: '32px',
  minHeight: '32px',
  borderRadius: '50%',
  padding: 0,
  textTransform: 'none',
  backgroundColor: isActive ? '#2B2B2B' : '#E0E0E0',
  color: isActive ? '#FFFFFF' : '#2B2B2B',
  fontWeight: isActive ? 600 : 400,
  '&:hover': {
    backgroundColor: isActive ? '#2B2B2B' : '#D5D5D5'
  }
})
