import { useStore } from '@/store/useStore'

export const useReset = () => {
  const setTasks = useStore(s => s.setTasks)
  const setEditingTask = useStore(s => s.setEditingTask)

  const reset = () => {
    setTasks(null)
    setEditingTask(null)
  }

  return { reset }
}
