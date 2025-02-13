import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StepWrapper from '~/components/step-wrapper/StepWrapper'
import TempComponent from './TempComponent'
import {
  tutorStepLabels,
  studentStepLabels
} from '~/components/user-steps-wrapper/constants'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import reducer from '~/redux/reducer'

vi.mock('~/context/snackbar-context', () => ({
  useSnackBarContext: vi.fn().mockReturnValue({
    setAlert: vi.fn()
  })
}))

vi.mock('~/hooks/use-steps', async () => {
  const actual = await vi.importActual('~/hooks/use-steps')
  return {
    ...actual,
    useSteps: vi.fn().mockReturnValue({
      activeStep: 0,
      isLastStep: false,
      loading: false,
      stepOperation: {
        next: vi.fn(),
        back: vi.fn(),
        setActiveStep: vi.fn(),
        handleSubmit: vi.fn()
      },
      data: {
        firstName: 'John',
        lastName: 'Doe',
        country: 'USA',
        city: 'New York',
        professionalSummary: 'Developer',
        languages: ['English'],
        interests: {},
        photoFile: [
          new File(['photo content'], 'photo.jpg', { type: 'image/jpeg' })
        ]
      }
    })
  }
})

const stepsMock = tutorStepLabels || studentStepLabels

const childrenArrMock = [
  <TempComponent key='1'>1</TempComponent>,
  <TempComponent key='2'>2</TempComponent>,
  <TempComponent key='3'>3</TempComponent>,
  <TempComponent key='4'>4</TempComponent>
]

const renderWithStore = (children) => {
  const store = configureStore({
    reducer: { appMain: reducer }
  })

  return render(<Provider store={store}>{children}</Provider>)
}

describe('StepWrapper test', () => {
  beforeEach(() => {
    renderWithStore(
      <StepWrapper data={{}} steps={stepsMock}>
        {childrenArrMock}
      </StepWrapper>
    )
  })

  it('should render second children after click on tab', async () => {
    const secondTab = screen.getByText(/step.stepLabels.language/i)
    await userEvent.click(secondTab)
    const secondChildren = screen.getByText(/3/i)
    expect(secondChildren).toBeInTheDocument()
  })

  it('should render finish button', async () => {
    let nextBtn = screen.getByText(/Next/i)
    await userEvent.click(nextBtn)

    nextBtn = screen.getByText(/Next/i)
    await userEvent.click(nextBtn)

    nextBtn = screen.getByText(/Next/i)
    await userEvent.click(nextBtn)

    const finishBtn = screen.getByText(/Finish/i)
    await userEvent.click(finishBtn)
    expect(vi.fn()).not.toHaveBeenCalled()
  })

  it('should render first children after click on next and back button', async () => {
    const nextBtn = screen.getByText(/Next/i)
    await userEvent.click(nextBtn)

    const backBtn = screen.getByText(/Back/i)
    await userEvent.click(backBtn)

    const firstChildren = screen.getByText(/1/i)
    expect(firstChildren).toBeInTheDocument()
  })
})
