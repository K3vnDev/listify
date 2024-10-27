import { UNSAVED_TASK_ID } from '@/consts'
import type { List, Task } from '@/types.d'
import { create } from 'zustand'
import { modifyTasks } from './modifyTasks'

interface Store {
  lists: List[] | null
  setLists: (value: List[]) => void

  tasks: Task[] | null
  setTasks: (value: Task[] | null) => void

  createTask: (id: string, text?: string, done?: boolean, atIndex?: number) => void
  deleteTask: (id: string) => void

  setTaskDone: (value: boolean, id: string) => void
  setTaskText: (value: string, id: string) => void
  setTaskId: (value: string, id: string) => void

  editingTask: string | null
  setEditingTask: (value: string | null) => void
}

export const useStore = create<Store>(set => ({
  lists: null,
  setLists: value => set(() => ({ lists: value })),

  tasks: null,
  setTasks: value => set(() => ({ tasks: value })),

  createTask: (id, text = '', done = false, atIndex?) =>
    set(({ tasks }) => {
      const newTasks = [...(tasks ?? [])]
      const newTask: Task = { id, text, done }

      if (atIndex !== undefined && atIndex !== -1) {
        newTasks.splice(atIndex, 0, newTask)
        return { tasks: newTasks }
      }
      return { tasks: [...newTasks, newTask] }
    }),

  deleteTask: id =>
    set(({ tasks }) =>
      modifyTasks(tasks, id, (newTasks, _, i) => {
        newTasks.splice(i, 1)
        return newTasks
      })
    ),

  setTaskDone: (value, id) =>
    set(({ tasks }) =>
      modifyTasks(tasks, id, (newTasks, selectedTask, i) => {
        selectedTask.done = value
        newTasks.splice(i, 1, selectedTask)
        return newTasks
      })
    ),

  setTaskText: (value, id) =>
    set(({ tasks }) =>
      modifyTasks(tasks, id, (newTasks, selectedTask, i) => {
        selectedTask.text = value
        newTasks.splice(i, 1, selectedTask)
        return newTasks
      })
    ),

  setTaskId: (value, id) =>
    set(({ tasks, setEditingTask }) =>
      modifyTasks(tasks, id, (newTasks, selectedTask, i) => {
        selectedTask.id = value
        newTasks.splice(i, 1, selectedTask)
        setEditingTask(value)
        return newTasks
      })
    ),

  editingTask: null,
  setEditingTask: value => set(() => ({ editingTask: value }))
}))
