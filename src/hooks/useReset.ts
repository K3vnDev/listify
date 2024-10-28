import { useTasksStore } from '@/store/tasks/useTasksStore'

export const useReset = () => {
  const setTasks = useTasksStore(s => s.setTasks)
  const setEditingTask = useTasksStore(s => s.setEditingTask)

  const reset = () => {
    setTasks(null)
    setEditingTask(null)
  }

  return { reset }
}
