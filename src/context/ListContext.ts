import { createContext } from 'react'

interface Context {
  isBeingDeleted: boolean
  setIsBeingDeleted: React.Dispatch<React.SetStateAction<boolean>>
}
export const ListContext = createContext<Context>({
  isBeingDeleted: false,
  setIsBeingDeleted: () => {}
})
