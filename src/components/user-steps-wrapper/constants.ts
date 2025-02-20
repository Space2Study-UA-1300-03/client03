import { nameField, textField, checkboxField } from '~/utils/validations/common'

export const initialValues = {
  firstName: '',
  lastName: '',
  country: null,
  city: null,
  professionalSummary: '',
  interests: {},
  languages: [],
  photo: null,
  photoFile: null,
  more18Years: false
}

export const validations = {
  firstName: nameField,
  lastName: nameField,
  professionalSummary: textField(0, 200),
  more18Years: checkboxField
}

export const tutorStepLabels = ['generalInfo', 'subjects', 'language', 'photo']

export const studentStepLabels = [
  'generalInfo',
  'interests',
  'language',
  'photo'
]

export const tabMap = {
  generalInfo: [
    'city',
    'country',
    'professionalSummary',
    'firstName',
    'lastName',
    'more18Years'
  ],
  interests: ['interests'],
  language: ['languages'],
  photo: ['photo', 'photoFile']
}
