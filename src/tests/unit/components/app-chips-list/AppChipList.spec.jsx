import { render, screen, fireEvent, within } from '@testing-library/react'
import { vi } from 'vitest'
import AppChipList from '~/components/app-chips-list/AppChipList'

describe('AppChipList component', () => {
  const mockedItems = [
    'Chip 1',
    'Chip 2',
    'Chip 3',
    'Chip 4',
    'Chip 5',
    'Chip 6',
    'Chip 7',
    'Chip 8',
    'Chip 9',
    'Chip 10',
    'Chip 11'
  ]
  const mockedHandleChipDelete = vi.fn()

  it('should show all chips if items length <= defaultQuantity', () => {
    render(<AppChipList defaultQuantity={5} items={mockedItems.slice(0, 3)} />)

    mockedItems.slice(0, 3).forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })

    expect(screen.queryByTestId('amount-of-chips')).toBeNull()
  })

  it('should show chip with +N if items length > defaultQuantity', () => {
    render(<AppChipList defaultQuantity={5} items={mockedItems} />)

    const moreChips = screen.getByTestId('amount-of-chips')
    expect(moreChips).toBeInTheDocument()
    expect(moreChips).toHaveTextContent('+6')
  })

  it('should show only 7 chips', () => {
    render(<AppChipList defaultQuantity={7} items={mockedItems} />)

    mockedItems.slice(0, 7).forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })

    expect(screen.getByTestId('amount-of-chips')).toHaveTextContent('+4')
  })

  it('should show only 10 chips', () => {
    render(<AppChipList defaultQuantity={10} items={mockedItems} />)

    mockedItems.slice(0, 10).forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })

    expect(screen.getByTestId('amount-of-chips')).toHaveTextContent('+1')
  })

  it('should delete a chip when handleChipDelete is called', () => {
    render(
      <AppChipList
        defaultQuantity={5}
        handleChipDelete={mockedHandleChipDelete}
        items={mockedItems}
      />
    )

    const chipToDelete = screen.getByText(mockedItems[0])
    const closeButton = within(
      chipToDelete.closest('[data-testid="chip"]')
    ).getByTestId('close-btn')

    fireEvent.click(closeButton)

    expect(mockedHandleChipDelete).toHaveBeenCalledTimes(1)
    expect(mockedHandleChipDelete).toHaveBeenCalledWith(mockedItems[0])
  })
})
