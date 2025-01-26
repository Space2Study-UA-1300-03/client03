import { ChangeEvent, FocusEvent, FormEvent } from 'react'
import { FormData } from '~/types/common/interfaces/common.interfaces'

export interface SignUpFormProps {
  handleSubmit: (event: FormEvent<HTMLDivElement>) => void
  handleChange: (
    field: keyof FormData
  ) => (event: ChangeEvent<HTMLInputElement>) => void
  handleBlur: (
    field: keyof FormData
  ) => (event: FocusEvent<HTMLInputElement>) => void
  data: FormData
  errors: Partial<FormData>
}
