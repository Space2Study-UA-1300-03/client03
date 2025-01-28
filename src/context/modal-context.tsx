import { PaperProps } from '@mui/material/Paper'
import {
  FC,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import PopupDialog from '~/components/popup-dialog/PopupDialog'

interface Component {
  component: React.ReactElement
  paperProps?: PaperProps
}

interface ModalProvideContext {
  openModal: (component: Component, delayToClose?: number) => void
  closeModal: (forceQuit?: boolean) => void
  registerEvent: (key: string, func: () => boolean | void) => void
  unregisterEvent: (key: string) => void
}

interface ModalProviderProps {
  children: React.ReactElement
}

export const CLOSE_EVENT_KEY = 'onCloseEvent'

const ModalContext = createContext<ModalProvideContext>(
  {} as ModalProvideContext
)

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<React.ReactElement | null>(null)
  const [paperProps, setPaperProps] = useState<PaperProps>({})
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  const [events, setEvents] = useState<Record<string, () => boolean>>({})

  const closeModal = useCallback(
    (forceQuit: boolean = false) => {
      const isContinue =
        typeof events[CLOSE_EVENT_KEY] === 'function' && !forceQuit
          ? events[CLOSE_EVENT_KEY]()
          : true

      if (isContinue) {
        setModal(null)
        setPaperProps({})
        setTimer(null)
      }
    },
    [setModal, setPaperProps, setTimer, events]
  )

  const closeModalEvent = useCallback(() => {
    return closeModal()
  }, [closeModal])

  const registerEvent = useCallback(
    (key: string, func: () => boolean) => {
      setEvents((prevEvents) => {
        return Object.assign(prevEvents, {
          [key]: func
        })
      })
    },
    [setEvents]
  )

  const unregisterEvent = useCallback(
    (key: string) => {
      setEvents((prevEvents) => {
        if (key in prevEvents) {
          delete prevEvents[key]
        }
        return prevEvents
      })
    },
    [setEvents]
  )

  const closeModalAfterDelay = useCallback(
    (delay?: number) => {
      const timerId = setTimeout(closeModal, delay ?? 5000)
      setTimer(timerId)
    },
    [closeModal]
  )

  const openModal = useCallback(
    ({ component, paperProps }: Component, delayToClose?: number) => {
      setModal(component)

      paperProps && setPaperProps(paperProps)
      delayToClose && closeModalAfterDelay(delayToClose)
    },
    [setModal, setPaperProps, closeModalAfterDelay]
  )

  const contextValue = useMemo(
    () => ({ openModal, closeModal, registerEvent, unregisterEvent }),
    [closeModal, openModal, registerEvent, unregisterEvent]
  )

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modal && (
        <PopupDialog
          closeModal={closeModalEvent}
          closeModalAfterDelay={closeModalAfterDelay}
          content={modal}
          paperProps={paperProps}
          timerId={timer}
        />
      )}
    </ModalContext.Provider>
  )
}

const useModalContext = () => useContext(ModalContext)

export { ModalProvider, useModalContext }
