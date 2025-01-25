import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppRange from '~/components/app-range/AppRange'

const onChangeMock = vi.fn()

const propsMock = {
  min: 0,
  max: 100,
  onChange: onChangeMock,
  value: [10, 50]
}

describe('AppRange', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    render(<AppRange {...propsMock} />)
  })

  it('should renders correctly', () => {
    const inputs = screen.getAllByRole('textbox')
    expect(inputs[0]).toHaveValue('10')
    expect(inputs[1]).toHaveValue('50')

    const sliders = screen.getAllByRole('slider')
    expect(sliders[0]).toHaveAttribute('min', '0')
    expect(sliders[0]).toHaveAttribute('max', '100')

    expect(screen.getByText(/from/i)).toBeInTheDocument()
    expect(screen.getByText(/to/i)).toBeInTheDocument()
  })

  it('it should call onChange when slider is moved', async () => {
    const sliders = screen.getAllByRole('slider')
    fireEvent.change(sliders[0], { target: { value: 17 } })

    expect(sliders[0].value).toBe('17')
    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalled('17')
    })
  })

  it('it should call onChange when input is changed', async () => {
    const inputs = screen.getAllByRole('textbox')

    await userEvent.clear(inputs[0])
    await userEvent.type(inputs[0], '20')

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledWith([20, 50])
    })
  })

  it('it should not call onChange when input is changed with not a number', async () => {
    const inputs = screen.getAllByRole('textbox')

    await userEvent.clear(inputs[0])
    await userEvent.type(inputs[0], 'NaN')

    await waitFor(() => {
      expect(onChangeMock).not.toHaveBeenCalled()
    })
  })

  it('should call onChange with min number if input is empty', async () => {
    const inputs = screen.getAllByRole('textbox')

    await userEvent.clear(inputs[0])
    await userEvent.tab()

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledWith([propsMock.min, 50])
    })
  })

  //   it('should update prices when input is blurred and input is greater than max value', async () => {
  //     const inputs = screen.getAllByRole('textbox')

  //     await userEvent.clear(inputs[1])
  //     await userEvent.type(inputs[1], '1500000')
  //     await userEvent.tab()

  //     expect(inputs[1]).not.toHaveFocus()

  //     expect(inputs[1]).toHaveValue('100')
  //     await waitFor(() => {
  //       expect(onChangeMock).toHaveBeenCalledWith([10, propsMock.max])
  //     })
  //   })

  it('should not update prices when input is blurred and value in input has not changed', async () => {
    const inputs = screen.getAllByRole('textbox')

    await userEvent.click(inputs[0])
    await userEvent.tab()

    await waitFor(() => {
      expect(onChangeMock).not.toHaveBeenCalled()
    })
  })
})
