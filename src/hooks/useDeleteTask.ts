import { useTasksStore } from '@/store/tasks/useTasksStore'
import { dataFetch } from '@/utils/dataFetch'
import { useParams } from 'next/navigation'

export const useDeleteTask = (taskId: string, text: string, done: boolean) => {
  const deleteTask = useTasksStore(s => s.deleteTask)
  const createTask = useTasksStore(s => s.createTask)
  const tasks = useTasksStore(s => s.tasks)
  const { listId } = useParams()

  const handleError = () => {
    // biome-ignore format: <>
    const index = tasks 
      ? tasks.findIndex(task => task.id === taskId) 
      : undefined

    createTask(taskId, text, done, index)
  }

  const handleDeleteTask = async () => {
    deleteTask(taskId)

    dataFetch({
      url: `/api/tasks?list-id=${listId}`,
      options: {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId })
      },
      onError: handleError
    })
  }

  return { deleteTask: handleDeleteTask }
}
