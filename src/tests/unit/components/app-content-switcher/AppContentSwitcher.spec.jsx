import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'

const mockOnChange = vi.fn()

const switchOptions = {
  left: { text: 'Left Option', tooltip: 'Left Tooltip' },
  right: { text: 'Right Option', tooltip: 'Right Tooltip' }
}

const defaultProps = {
  active: false,
  onChange: mockOnChange,
  switchOptions,
  typographyVariant: 'body1',
  styles: {}
}

describe('AppContentSwitcher', () => {
  it('should render with the correct props', () => {
    render(<AppContentSwitcher {...defaultProps} />)
    expect(screen.getByText('Left Option')).toBeInTheDocument()
    expect(screen.getByText('Right Option')).toBeInTheDocument()
    expect(screen.getByTestId('switch')).toBeInTheDocument()
  })

  it('should call the onChange function when the switch is clicked', async () => {
    render(<AppContentSwitcher {...defaultProps} />)

    const switchElement = screen.getByRole('checkbox')
    await userEvent.click(switchElement)
    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })

  it('should render tooltips when tooltip props are passed', async () => {
    render(<AppContentSwitcher {...defaultProps} />)

    const leftOption = screen.getByText('Left Option')
    const rightOption = screen.getByText('Right Option')

    await userEvent.hover(leftOption)
    expect(await screen.findByText('Left Tooltip')).toBeInTheDocument()

    await userEvent.hover(rightOption)
    expect(await screen.findByText('Right Tooltip')).toBeInTheDocument()
  })
})
