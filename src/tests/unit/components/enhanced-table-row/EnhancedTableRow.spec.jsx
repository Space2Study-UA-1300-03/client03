import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import EnhancedTableRow from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow'

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
const isSelectionMock = ''
const itemMock = {}
const refetchDataMock = ''
const rowActionsMock = []
const onRowClickMock = vi.fn()
const selectMock = {}
const selectedRowsMock = ''
const keyMock = 1
const handleSelectClick = vi.fn()

describe('EnhancedTableRow', () => {
  it('should render table row with correct data', () => {
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
      />
    )
    const row = screen.getByRole('row')
    expect(row).toHaveTextContent(refetchDataMock)
  })

  it('it should call handleSelectClick when checkbox is clicked', async () => {
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
      />
    )
    const checkbox = screen.getByTestId('menu-icon')
    await userEvent.click(checkbox)
    expect(handleSelectClick).toHaveBeenCalled()
  })
})
