import { LoadingIcon } from '@/icons'
import { useTasksStore } from '@/store/tasks/useTasksStore'
import { dataFetch } from '@/utils/dataFetch'
import { Task } from '@components/tasks/Task'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export const TasksSection = () => {
  const setTasks = useTasksStore(s => s.setTasks)
  const tasks = useTasksStore(s => s.tasks)

  const { listId } = useParams()

  const handleError = () => {
    // TODO: Handle error
  }

  useEffect(() => {
    dataFetch({
      url: `/api/tasks?list-id=${listId}`,
      onSuccess: data => setTasks(data),
      onError: handleError
    })
  }, [])

  if (tasks === null)
    return <LoadingIcon className='animate-spin mx-auto my-2 size-12 text-zinc-500' />

  if (tasks.length === 0)
    return (
      <span className='h-12 mt-4 w-full flex flex-col items-center justify-center text-zinc-500'>
        You dont have any tasks yet.
      </span>
    )

  return (
    <ul className='flex flex-col gap-2'>
      {tasks.map(task => (
        <Task key={task.id} {...task} />
      ))}
    </ul>
  )
}
