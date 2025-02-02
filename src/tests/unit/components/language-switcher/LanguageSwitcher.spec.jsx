import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useTranslation } from 'react-i18next'

import LanguageSwitcher from '~/components/language-switcher/LanguageSwitcher'

const mockedChangeLanguage = vi.fn(() => Promise.resolve())

vi.mock('react-i18next', async () => {
  const actual = await vi.importActual('react-i18next')
  return {
    ...actual,
    useTranslation: vi.fn(() => ({
      t: (key) => key,
      i18n: {
        changeLanguage: mockedChangeLanguage,
        language: 'en',
        resolvedLanguage: 'en'
      }
    }))
  }
})

describe('LanguageSwitcher component tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    render(<LanguageSwitcher />)
  })

  it('renders the language switcher button', async () => {
    const button = screen.getByLabelText('Change language')
    expect(button).toBeInTheDocument()
  })

  it('opens the language menu when clicking the button', async () => {
    const button = screen.getByLabelText('Change language')
    await userEvent.click(button)

    const menu = screen.getByRole('listbox')
    expect(menu).toBeVisible()
  })

  it('changes language when a language option is clicked', async () => {
    const { i18n } = useTranslation()
    const button = screen.getByLabelText('Change language')
    await userEvent.click(button)

    const ukrainianOption = screen.getByText('Українська')
    await userEvent.click(ukrainianOption)

    expect(i18n.changeLanguage).toHaveBeenCalledWith('ua')
  })

  it('closes the menu after clicking a language option', async () => {
    const button = screen.getByLabelText('Change language')
    await userEvent.click(button)

    const ukrainianOption = screen.getByText('Українська')
    await userEvent.click(ukrainianOption)

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('saves selected language to localStorage', async () => {
    const button = screen.getByLabelText('Change language')
    await userEvent.click(button)

    const ukrainianOption = screen.getByText('Українська')
    await userEvent.click(ukrainianOption)

    expect(window.localStorage.getItem('i18nextLng')).toBe('ua')

    await userEvent.click(button)

    const engOption = screen.getByText('English')
    await userEvent.click(engOption)

    expect(window.localStorage.getItem('i18nextLng')).toBe('en')
  })
})
