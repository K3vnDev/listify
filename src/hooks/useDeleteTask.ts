import { useTasksStore } from '@/store/tasks/useTasksStore'
import { useParams } from 'next/navigation'

export const useDeleteTask = (taskId: string, text: string, done: boolean) => {
  const deleteTask = useTasksStore(s => s.deleteTask)
  const createTask = useTasksStore(s => s.createTask)
  const tasks = useTasksStore(s => s.tasks)
  const { listId } = useParams()

  const handleDeleteTask = async () => {
    deleteTask(taskId)

    const handleError = () => {
      // biome-ignore format: <>
      const index = tasks 
        ? tasks.findIndex(task => task.id === taskId) 
        : undefined

      createTask(taskId, text, done, index)
    }

    try {
      const res = await fetch(`/api/tasks?list-id=${listId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId })
      })

      const { success } = await res.json()
      if (!success || !res.ok) handleError()
    } catch {
      handleError()
    }
  }

  return { deleteTask: handleDeleteTask }
}
