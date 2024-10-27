import { UNSAVED_TASK_ID } from '@/consts'
import type { List, Task } from '@/types.d'
import { create } from 'zustand'

interface Store {
  lists: List[] | null
  setLists: (value: List[]) => void

  tasks: Task[] | null
  setTasks: (value: Task[] | null) => void

  setTaskDone: (value: boolean, id: string) => void
  setTaskText: (value: string, id: string) => void

  createTask: () => void
  setUnSavedTaskId: (value: string) => void

  editingTask: string | null
  setEditingTask: (value: string | null) => void
}

export const useStore = create<Store>(set => ({
  lists: null,
  setLists: value => set(() => ({ lists: value })),

  tasks: null,
  setTasks: value => set(() => ({ tasks: value })),

  setTaskDone: (value, id) =>
    set(({ tasks }) => {
      if (tasks === null) return {}

      const index = tasks.findIndex(task => task.id === id)
      const newTasks = [...tasks]
      const newTask = newTasks[index]

      newTask.done = value
      newTasks.splice(index, 1, newTask)

      return { tasks: newTasks }
    }),

  setTaskText: (value, id) =>
    set(({ tasks }) => {
      if (tasks === null) return {}

      const index = tasks.findIndex(task => task.id === id)
      const newTasks = [...tasks]
      const newTask = newTasks[index]

      newTask.text = value
      newTasks.splice(index, 1, newTask)

      return { tasks: newTasks }
    }),

  createTask: () =>
    set(({ tasks }) => {
      const newTask: Task = {
        id: UNSAVED_TASK_ID,
        text: '',
        done: false
      }
      const newTasks = [...(tasks ?? []), newTask]
      return { tasks: newTasks }
    }),

  setUnSavedTaskId: value =>
    set(({ tasks }) => {
      if (tasks === null) return {}

      const index = tasks.findIndex(task => task.id === UNSAVED_TASK_ID)
      if (index === -1) return {}

      const newTasks = [...tasks]
      const newTask = newTasks[index]
      newTask.id = value
      newTasks.splice(index, 1, newTask)

      return { tasks: newTasks }
    }),

  editingTask: null,
  setEditingTask: value => set(() => ({ editingTask: value }))
}))
