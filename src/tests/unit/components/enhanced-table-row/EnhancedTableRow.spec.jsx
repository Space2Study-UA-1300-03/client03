import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EnhancedTableRow from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow'
import { MenuItem, Checkbox, Menu } from '@mui/material'

const mockedUseNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const mod =
    (await vi.importActual) <
    typeof import('react-router-dom') >
    'react-router-dom'
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate
  }
})

const columsMock = []
const rowActionsMock = []
const isSelectionMock = ''
const refetchDataMock = ''
const selectedRowsMock = ''
const keyMock = '1'
const itemMock = {}
const selectMock = {}
const onRowClickMock = vi.fn()
const handleSelectClick = vi.fn()
const onActionMock = vi.fn()

const item1Mock = 'item 1'
const item2Mock = 'item 2'

const renderComponent = (props = {}) =>
  render(
    <EnhancedTableRow
      columns={columsMock}
      isSelection={isSelectionMock}
      item={itemMock}
      key={keyMock}
      onChange={handleSelectClick}
      onRowClick={onRowClickMock}
      refetchData={refetchDataMock}
      rowActions={rowActionsMock}
      select={selectMock}
      selectedRows={selectedRowsMock}
      {...props}
    />
  )

describe('EnhancedTableRow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    renderComponent()
  })

  it('should render table row with correct data', () => {
    const row = screen.getByRole('row')
    expect(row).toHaveTextContent(refetchDataMock)
  })

  it('should render table cell with correct data', () => {
    const row = screen.getByRole('cell')
    expect(row).toHaveTextContent(refetchDataMock)
  })

  it('it should call handleSelectClick when checkbox is clicked', async () => {
    render(<Checkbox onChange={handleSelectClick} />)
    const checkbox = screen.getByRole('checkbox')
    await userEvent.click(checkbox)
    expect(handleSelectClick).toHaveBeenCalled()
  })

  it('it should render action menu with item 1 when menu icon is clicked', async () => {
    render(<MenuItem> {item1Mock} </MenuItem>)
    const menuIcon = screen.getByTestId('menu-icon')
    await userEvent.click(menuIcon)
    expect(screen.getByText(item1Mock)).toBeInTheDocument()
  })

  it('it should render action menu with item 2 when menu icon is clicked', async () => {
    render(<MenuItem> {item2Mock} </MenuItem>)
    const menuIcon = screen.getByTestId('menu-icon')
    await userEvent.click(menuIcon)
    expect(screen.getByText(item2Mock)).toBeInTheDocument()
  })

  it('it should call onAction function when clicking on the menu item', async () => {
    render(<MenuItem onClick={onActionMock}> {item1Mock} </MenuItem>)
    const menuItem = screen.getByText(item1Mock)
    await userEvent.click(menuItem)
    expect(onActionMock).toHaveBeenCalledOnce()
  })

  it('it should close menu when "escape" is pressed', async () => {
    render(
      <Menu>
        <MenuItem> {item1Mock} </MenuItem>
        <MenuItem> {item2Mock} </MenuItem>
      </Menu>
    )
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByText(item1Mock)).not.toBeInTheDocument()
    expect(screen.queryByText(item2Mock)).not.toBeInTheDocument()
  })
})
