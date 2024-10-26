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

  if (tasks === null || tasks.length === 0) return null

  return (
    <ul className='flex flex-col gap-2'>
      {tasks.map(task => (
        <Task key={task.id} {...task} />
      ))}
    </ul>
  )
}
