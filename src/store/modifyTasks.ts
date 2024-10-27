import type { Task } from '@/types.d'

type Modifier = (newTasks: Task[], selectedTask: Task, index: number) => Task[]

export const modifyTasks = (tasks: Task[] | null, id: string, modify: Modifier) => {
  if (tasks === null) return {}

  const index = tasks.findIndex(task => task.id === id)
  if (index === -1) return {}

  const newTasks = [...tasks]
  const newTask = newTasks[index]

  return { tasks: modify(newTasks, newTask, index) }
}
