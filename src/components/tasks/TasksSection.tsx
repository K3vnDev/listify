import { LoadingIcon } from '@/icons'
import { useStore } from '@/store/useStore'
import { Task } from '@components/tasks/Task'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export const TasksSection = () => {
  const setTasks = useStore(s => s.setTasks)
  const tasks = useStore(s => s.tasks)

  const { listId } = useParams()

  const handleError = () => {}

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`/api/tasks?list-id=${listId}`)
        if (!res.ok) handleError()
        const { data } = await res.json()
        setTasks(data)
      } catch {
        handleError()
      }
    })()
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
