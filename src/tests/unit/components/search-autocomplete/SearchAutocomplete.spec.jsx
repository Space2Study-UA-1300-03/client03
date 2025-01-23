import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'

const setSearchMock = vi.fn()
const onSearchChangeMock = vi.fn()
const optionsMock = ['Hello', 'World', '!', 'Test1', 'Test2']

describe('SearchAutocomplete', () => {
  beforeEach(() => {
    render(
      <SearchAutocomplete
        onSearchChange={onSearchChangeMock}
        options={optionsMock}
        search=''
        setSearch={setSearchMock}
        textFieldProps={{ label: 'Search' }}
      />
    )
  })

  it('should renders autocomplete with search input', () => {
    const autocompleteInput = screen.getByRole('combobox')

    expect(autocompleteInput).toBeInTheDocument()
  })

  it('should updates search input on typing', async () => {
    const autocompleteInput = screen.getByRole('combobox')
    await userEvent.type(autocompleteInput, 'Hello World!')

    expect(autocompleteInput).toHaveValue('Hello World!')
  })

  it('should filter options on typing', async () => {
    const autocompleteInput = screen.getByRole('combobox')
    await userEvent.type(autocompleteInput, 'Hello')

    const options = await screen.findAllByRole('option')

    expect(options.length).toBeLessThanOrEqual(6)
  })

  it('should selects an option on click', async () => {
    const autocompleteInput = screen.getByRole('combobox')
    await userEvent.click(autocompleteInput)

    const selectedOption = screen.getByText('Hello')
    await userEvent.click(selectedOption)

    expect(setSearchMock).toHaveBeenCalledWith('Hello')
    expect(onSearchChangeMock).toHaveBeenCalled()
  })

  it('should clears search input on clear icon click', async () => {
    const autocompleteInput = screen.getByRole('combobox')
    const clearButton = screen.getByTestId('clear-button')

    await userEvent.type(autocompleteInput, 'Hello World!')
    await userEvent.click(clearButton)

    expect(setSearchMock).toHaveBeenCalledWith('')
    expect(autocompleteInput).toHaveValue('')
  })

  it('should triggers search on search button click', async () => {
    const autocompleteInput = screen.getByRole('combobox')
    const searchButton = screen.getByRole('button', { name: /search/i })

    await userEvent.type(autocompleteInput, 'Hello World!')
    await userEvent.click(searchButton)

    expect(onSearchChangeMock).toHaveBeenCalled()
    expect(setSearchMock).toHaveBeenCalledWith('Hello World!')
  })
})
