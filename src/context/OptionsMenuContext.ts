import { createContext } from 'react'

interface Context {
  isShowing: boolean
  setIsShowing: React.Dispatch<React.SetStateAction<boolean>>
}
export const OptionsMenuContext = createContext<Context>({
  isShowing: false,
  setIsShowing: () => {}
})
