import { ChangeEvent, FocusEvent, FormEvent } from 'react'

export interface SignUpFormProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  handleChange: (
    field: keyof FormData
  ) => (event: ChangeEvent<HTMLInputElement>) => void
  handleBlur: (
    field: keyof FormData
  ) => (event: FocusEvent<HTMLInputElement>) => void
  data: FormData
  errors: Partial<FormData>
}

export interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}
