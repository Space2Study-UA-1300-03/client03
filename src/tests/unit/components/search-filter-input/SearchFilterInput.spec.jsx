import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'

const mockUpdateFilter = vi.fn()
const textFieldProps = { placeholder: 'Search...' }

beforeEach(() => {
  mockUpdateFilter.mockClear()
  render(
    <SearchFilterInput
      textFieldProps={textFieldProps}
      updateFilter={mockUpdateFilter}
    />
  )
})

describe('SearchFilterInput', () => {
  it('should render the component with an input in it', () => {
    const inputElement = screen.getByPlaceholderText(/search/i)
    expect(inputElement).toBeInTheDocument()
  })

  it('should render typed text correctly', async () => {
    const inputElement = screen.getByPlaceholderText(/search/i)
    await userEvent.type(inputElement, 'Test Text')
    expect(inputElement).toHaveValue('Test Text')
  })

  it('should delete typed text when the clear button is clicked', async () => {
    const inputElement = screen.getByPlaceholderText(/search/i)
    await userEvent.type(inputElement, 'Test Text')
    expect(inputElement).toHaveValue('Test Text')
    const clearButton = screen.getByTestId('clearIcon')
    await userEvent.click(clearButton)
    expect(inputElement).toHaveValue('')
    expect(mockUpdateFilter).toHaveBeenCalledWith('')
  })

  it('should call updateFilter function on search button click', async () => {
    const inputElement = screen.getByPlaceholderText(/search/i)
    const searchButton = screen.getByRole('button', { name: /search/i })
    await userEvent.type(inputElement, 'Test Text')
    await userEvent.click(searchButton)
    expect(mockUpdateFilter).toHaveBeenCalledWith('Test Text')
  })

  it('should call updateFilter function when Enter is pressed', async () => {
    const inputElement = screen.getByPlaceholderText(/search/i)
    await userEvent.type(inputElement, 'Test Text{Enter}')
    expect(mockUpdateFilter).toHaveBeenCalledWith('Test Text')
  })
})
