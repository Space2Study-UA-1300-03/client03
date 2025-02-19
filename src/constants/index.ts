import { AlertColor } from '@mui/material/Alert'

export const s2s = 's2s'

export const student = 'student'
export const tutor = 'tutor'
export const admin = 'admin'

export const login = 'login'
export const signup = 'signup'

export const snackbarVariants: { [key: string]: AlertColor } = {
  error: 'error',
  info: 'info',
  success: 'success',
  warning: 'warning'
}

export const defaultResponses = {
  array: [],
  object: {},
  itemsWithCount: {
    data: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 10,
      hasNextPage: false,
      hasPrevPage: false
    }
  }
}

export const itemsLoadLimit = {
  tablet: 10,
  mobile: 6,
  default: 12
}

export const textAreaLimit = {
  limit: 200
}
