import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import EnhancedTablePagination from '~/components/enhanced-table/enhanced-table-pagination/EnhancedTablePagination'

const mockPagination = {
  page: 1,
  pageInput: 1,
  rowsPerPage: 5,
  pageCount: 2,
  itemsCount: 10,
  handleChangePage: vi.fn(),
  handleChangeRowsPerPage: vi.fn(),
  handleChangePageInput: vi.fn(),
  handlePageSubmit: vi.fn()
}

describe('EnhancedTablePagination', () => {
  beforeEach(() =>
    render(<EnhancedTablePagination pagination={mockPagination} />)
  )

  it('should render first page', () => {
    const pageOneButton = screen.getByRole('button', { name: 'page 1' })
    expect(pageOneButton).toBeInTheDocument()

    const input = screen.getByTestId('pagination-page-input')
    expect(input).toHaveValue(1)
    expect(input).toBeInTheDocument()

    const label = screen.getByText('table.numberOfRows')
    expect(label).toBeInTheDocument()
  })

  it('should change page from 1 to 2', async () => {
    const pageTwoButton = screen.getByRole('button', { name: 'Go to page 2' })
    await userEvent.click(pageTwoButton)

    expect(mockPagination.handleChangePage).toHaveBeenCalledWith(
      expect.anything(),
      2
    )
  })

  it('should change page input value and submit when clicking go', async () => {
    const pageInput = screen.getByTestId('pagination-page-input')
    await userEvent.type(pageInput, '2')
    expect(mockPagination.handleChangePageInput).toHaveBeenCalled()

    const goButton = screen.getByRole('button', { name: 'table.go' })
    await userEvent.click(goButton)
    expect(mockPagination.handlePageSubmit).toHaveBeenCalledWith(
      mockPagination.pageCount
    )
  })
})
