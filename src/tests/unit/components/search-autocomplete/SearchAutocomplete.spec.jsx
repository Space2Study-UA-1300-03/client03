import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mediaQuery from 'css-mediaquery'

import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'

const setSearchMock = vi.fn()
const onSearchChangeMock = vi.fn()
const optionsMock = ['Hello', 'World', '!', 'Test1', 'Test2']

const createMatchMedia = (width) => (query) => ({
  matches: mediaQuery.match(query, { width }),
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn()
})

describe('SearchAutocomplete', () => {
  beforeEach(() => {
    window.matchMedia = createMatchMedia(1024)

    setSearchMock.mockClear()
    onSearchChangeMock.mockClear()
  })

  it('should renders autocomplete with search input', () => {
    render(
      <SearchAutocomplete
        onSearchChange={onSearchChangeMock}
        options={optionsMock}
        search=''
        setSearch={setSearchMock}
        textFieldProps={{ label: 'Search' }}
      />
    )
    const searchInput = screen.getByLabelText('Search')
    expect(searchInput).toBeInTheDocument()
  })

  it('should updates search input on typing', async () => {
    render(
      <SearchAutocomplete
        onSearchChange={onSearchChangeMock}
        options={optionsMock}
        search=''
        setSearch={setSearchMock}
        textFieldProps={{ label: 'Search' }}
      />
    )
    const searchInput = screen.getByLabelText('Search')
    await userEvent.type(searchInput, 'Hello World!')

    expect(searchInput).toHaveValue('Hello World!')
  })

  it('should filter options on typing', async () => {
    render(
      <SearchAutocomplete
        onSearchChange={onSearchChangeMock}
        options={optionsMock}
        search=''
        setSearch={setSearchMock}
        textFieldProps={{ label: 'Search' }}
      />
    )
    const searchInput = screen.getByLabelText('Search')
    await userEvent.type(searchInput, 'Hello')

    const options = await screen.findAllByRole('option')
    expect(options.length).toBeLessThanOrEqual(6)
  })

  it('should selects an option on click', async () => {
    render(
      <SearchAutocomplete
        onSearchChange={onSearchChangeMock}
        options={optionsMock}
        search=''
        setSearch={setSearchMock}
        textFieldProps={{ label: 'Search' }}
      />
    )
    const searchInput = screen.getByLabelText('Search')
    await userEvent.click(searchInput)

    const selectedOption = screen.getByText('Hello')
    await userEvent.click(selectedOption)

    expect(setSearchMock).toHaveBeenCalledWith('Hello')
    expect(onSearchChangeMock).toHaveBeenCalled()
  })

  it('should clears search input on clear icon click', async () => {
    render(
      <SearchAutocomplete
        onSearchChange={onSearchChangeMock}
        options={optionsMock}
        search='hello'
        setSearch={setSearchMock}
        textFieldProps={{ label: 'Search' }}
      />
    )
    const clearButton = screen.getByTestId('clear-button')
    await userEvent.click(clearButton)

    expect(onSearchChangeMock).toHaveBeenCalled()
    expect(setSearchMock).toHaveBeenCalledWith('')
  })

  it('should triggers search on search button click', async () => {
    render(
      <SearchAutocomplete
        onSearchChange={onSearchChangeMock}
        options={optionsMock}
        search=''
        setSearch={setSearchMock}
        textFieldProps={{ label: 'Search' }}
      />
    )
    const searchInput = screen.getByLabelText('Search')
    await userEvent.type(searchInput, 'hello')

    const searchButton = screen.getByRole('button', { name: /search/i })
    await userEvent.click(searchButton)

    expect(onSearchChangeMock).toHaveBeenCalled()
    expect(setSearchMock).toHaveBeenCalledWith('hello')
  })

  it("should trigger search on 'Enter' key press", async () => {
    render(
      <SearchAutocomplete
        onSearchChange={onSearchChangeMock}
        options={optionsMock}
        search=''
        setSearch={setSearchMock}
        textFieldProps={{ label: 'Search' }}
      />
    )
    const searchInput = screen.getByLabelText('Search')
    await userEvent.type(searchInput, 'Hello World!{enter}')

    expect(onSearchChangeMock).toHaveBeenCalled()
    expect(setSearchMock).toHaveBeenCalledWith('Hello World!')
  })

  it('should display the search icon in the search button on smaller screens', () => {
    window.matchMedia = createMatchMedia(500)
    render(
      <SearchAutocomplete
        onSearchChange={onSearchChangeMock}
        options={optionsMock}
        search=''
        setSearch={setSearchMock}
        textFieldProps={{ label: 'Search' }}
      />
    )
    const searchButton = screen.getByTestId('search-button')
    const searchIcon = screen.getByTestId('SearchIcon')

    expect(searchButton).toContainElement(searchIcon)
  })
})
