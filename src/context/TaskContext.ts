import { createContext } from 'react'

interface Context {
  taskId: string
  isEditing: boolean
  text: string
  done: boolean
  elementRef: React.MutableRefObject<null>
}

export const TaskContext = createContext<Context>({
  ...{ taskId: '', isEditing: false, text: '', done: false },
  elementRef: { current: null } as React.MutableRefObject<null>
})
