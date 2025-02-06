import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import SliderWithInput from '~/components/slider-with-input/SliderWithInput'

const mockOnChange = vi.fn()

const defaultProps = {
  defaultValue: 50,
  title: 'Price',
  min: 0,
  max: 100,
  onChange: mockOnChange
}

describe('SliderWithInput', () => {
  beforeEach(() => {
    mockOnChange.mockClear()
    render(<SliderWithInput {...defaultProps} />)
  })

  it('should render correctly', () => {
    const slider = screen.getByRole('slider')
    const input = screen.getByRole('textbox')
    expect(slider).toBeInTheDocument()
    expect(input).toBeInTheDocument()
  })

  it('should call onChange when slider is moved', async () => {
    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: 60 } })
    expect(slider.value).toBe('60')
    await waitFor(() => expect(mockOnChange).toHaveBeenCalledWith(60))
  })

  it('should update input value correctly when input value is empty', async () => {
    const input = screen.getByRole('textbox')
    await userEvent.clear(input)
    expect(input).toHaveValue('')
  })

  it('should update prices when input is blurred and value exceeds max', async () => {
    const input = screen.getByRole('textbox')
    await userEvent.clear(input)
    await userEvent.type(input, '150')
    await userEvent.tab()
    expect(input).toHaveValue('100')
  })

  it('should not update prices when input is blurred and value has not changed', async () => {
    const input = screen.getByRole('textbox')
    await userEvent.click(input)
    await userEvent.tab()
    expect(mockOnChange).not.toHaveBeenCalled()
  })
})
