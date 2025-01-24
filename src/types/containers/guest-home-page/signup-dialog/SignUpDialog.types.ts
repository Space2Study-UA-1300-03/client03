import { UserRoleEnum } from '~/types'

export interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export interface SignUpDialogProps {
  initialRole: UserRoleEnum
}
