import { helperTextHandler, nameField, confirmPassword } from './common'

export const firstName = (value) => {
  return nameField(value)
}

export const lastName = (value) => {
  return nameField(value)
}

export const email = (value) => {
  return helperTextHandler(value, 'email')
}

export const password = (value) => {
  return helperTextHandler(value, 'password')
}

export { confirmPassword }
