import { screen, userEvent } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import useAxios from '~/hooks/use-axios'

import EmailConfirmModal from '~/containers/email-confirm-modal/EmailConfirmModal'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'

const closeModal = vi.fn()
const openModalMock = vi.fn()

vi.mock('~/hooks/use-axios')

describe('EmailConfirmModal test', () => {
  const props = {
    confirmToken: 'test',
    closeModal: closeModal
  }

  it('should render negative-scenario image and message (BAD_CONFIRM_TOKEN)', async () => {
    const fakeData = {
      error: { code: 'BAD_CONFIRM_TOKEN' },
      loading: false,
      response: null
    }
    useAxios.mockImplementation(() => fakeData)
    renderWithProviders(<EmailConfirmModal {...props} />)

    const modalImg = screen.getByAltText('info')
    const title = screen.getByText('modals.emailNotConfirm')
    const description = screen.getByText('modals.emailReject.badToken')

    expect(modalImg).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should render negative-scenario image and message (EMAIL_ALREADY_CONFIRMED)', async () => {
    const fakeData = {
      error: { code: 'EMAIL_ALREADY_CONFIRMED' },
      loading: false,
      response: null
    }
    useAxios.mockImplementation(() => fakeData)
    renderWithProviders(<EmailConfirmModal {...props} />)

    const modalImg = screen.getByAltText('info')
    const title = screen.getByText('modals.emailAlreadyConfirm')
    const description = screen.getByText('modals.emailReject.alreadyConfirmed')

    expect(modalImg).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should render Loader - (loading from useAxios)', async () => {
    const fakeData = {
      error: null,
      loading: true,
      response: null
    }
    useAxios.mockImplementation(() => fakeData)
    renderWithProviders(<EmailConfirmModal {...props} />)

    const loader = screen.getByTestId('loader')

    expect(loader).toBeInTheDocument()
  })

  it('should open Login Dialog', async () => {
    const fakeData = { error: null, loading: false, response: true }
    useAxios.mockImplementation(() => fakeData)
    renderWithProviders(
      <EmailConfirmModal confirmToken='test' openModal={openModalMock} />
    )

    const goToLoginBtn = screen.getByRole('button', { name: /goToLogin/i })
    await userEvent.click(goToLoginBtn)

    expect(openModalMock).toHaveBeenCalledTimes(1)
    expect(openModalMock).toHaveBeenCalledWith({ component: <LoginDialog /> })
  })

  it('should render negative-scenario image and message (DOCUMENT_NOT_FOUND)', async () => {
    const fakeData = {
      error: { code: 'DOCUMENT_NOT_FOUND' },
      loading: false,
      response: null
    }

    useAxios.mockImplementation(() => fakeData)
    renderWithProviders(<EmailConfirmModal confirmToken='test' />)

    const modalImg = screen.getByAltText('info')
    const title = screen.getByText('modals.emailNotConfirm')
    const description = screen.getByText('modals.emailReject.badToken')

    expect(modalImg).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })
})
