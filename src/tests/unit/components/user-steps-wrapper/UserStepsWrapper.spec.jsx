import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'

const mockDispatch = vi.fn()

vi.mock('~/hooks/use-redux', async () => {
  const actual = await vi.importActual('~/hooks/use-redux')
  return {
    ...actual,
    useAppDispatch: () => mockDispatch
  }
})

vi.mock('~/context/step-context', () => ({
  StepProvider: ({ children }) => <div>{children}</div>
}))

vi.mock(
  '~/containers/tutor-home-page/general-info-step/GeneralInfoStep',
  () => ({
    __esModule: true,
    default: () => <div>Mocked GeneralInfoStep</div>
  })
)

vi.mock('~/containers/tutor-home-page/subjects-step/SubjectsStep', () => ({
  __esModule: true,
  default: () => <div>Mocked SubjectsStep</div>
}))

vi.mock('~/containers/tutor-home-page/language-step/LanguageStep', () => ({
  __esModule: true,
  default: () => <div>Mocked LanguageStep</div>
}))

vi.mock('~/containers/tutor-home-page/add-photo-step/AddPhotoStep', () => ({
  __esModule: true,
  default: () => (
    <div>
      Mocked AddPhotoStep
      <input aria-label='photo-upload' type='file' />
    </div>
  )
}))

vi.mock('~/components/step-wrapper/StepWrapper', () => ({
  __esModule: true,
  default: ({ children }) => (
    <div>
      <div>Mocked StepWrapper</div>
      <button aria-label='next' role='button'>
        Next
      </button>
      {children}
    </div>
  )
}))

vi.mock('~/components/user-steps-wrapper/constants', () => ({
  tutorStepLabels: ['General Info', 'Subjects', 'Languages', 'Add Photo'],
  initialValues: {}
}))

vi.mock('~/constants', () => ({
  student: 'student'
}))

describe('UserStepsWrapper', () => {
  it('renders the first tab', () => {
    render(<UserStepsWrapper userRole='tutor' />)
    expect(screen.getByText('Mocked GeneralInfoStep')).toBeInTheDocument()
  })

  it('renders the second tab after clicking "Next"', async () => {
    render(<UserStepsWrapper userRole='tutor' />)

    const nextButton = screen.getByRole('button', { name: /next/i })
    expect(nextButton).toBeInTheDocument()

    await userEvent.click(nextButton)
    expect(screen.getByText('Mocked SubjectsStep')).toBeInTheDocument()
  })

  it('renders file upload input', () => {
    render(<UserStepsWrapper userRole='tutor' />)
    const fileInput = screen.getByLabelText('photo-upload')
    expect(fileInput).toBeInTheDocument()
  })
})
