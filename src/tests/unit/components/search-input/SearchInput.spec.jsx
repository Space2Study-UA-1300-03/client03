import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { it, expect } from 'vitest'
import SearchInput from '~/components/search-input/SearchInput'

const mockedSearchText = 'test text'
const mockedSearchEmptyString = ''
const mockFn = vi.fn()

describe('SearchInput', () => {
  it('should render text correctly', async () => {
    const handleChange = vi.fn()
    render(<SearchInput onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, mockedSearchText)
    expect(input.value).toBe(mockedSearchText)
  })

  it('should call setSearch when search icon is clicked', async () => {
    render(<SearchInput search={mockedSearchText} setSearch={mockFn} />)
    const searchIcon = screen.getByTestId('search-icon')
    await userEvent.click(searchIcon)
    expect(mockFn).toHaveBeenCalledOnce()
  })

  it('should call setSearch with empty string when delete icon is clicked', async () => {
    render(<SearchInput search={mockedSearchText} setSearch={mockFn} />)
    const deleteIcon = screen.getByTestId('delete-icon')
    await userEvent.click(deleteIcon)
    expect(mockFn).toHaveBeenCalledWith('')
  })

  it('should call setSearch when enter is pressed', async () => {
    render(<SearchInput setSearch={mockFn} />)
    const searchIcon = screen.getByTestId('search-icon')
    await userEvent.type(searchIcon, '{Enter}')
    expect(mockFn).toHaveBeenCalled()
  })

  it('should have hidden class if search is empty', () => {
    render(<SearchInput search={mockedSearchEmptyString} />)
    const deleteIcon = screen.getByTestId('delete-icon')
    expect(deleteIcon).toHaveClass('hidden')
  })

  it('should have visible class if search is not empty', () => {
    render(<SearchInput search={mockedSearchText} />)
    const deleteIcon = screen.getByTestId('delete-icon')
    expect(deleteIcon).toHaveClass('visible')
  })
})
