import { TASKS_MOCK } from '@/mocks'
import type { Task } from '@/types.d'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export const TasksSection = () => {
  const [tasks, setTasks] = useState<Task | null>(null)
  const { listId } = useParams()

  const handleError = () => {}

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`/api/tasks?list-id=${listId}`)
        if (!res.ok) handleError()

        const data = await res.json()
        setTasks(data)
      } catch {
        handleError()
      }
    })()
  }, [])

  if (tasks === null) return

  return (
    <ul className='flex flex-col gap-2'>
      {TASKS_MOCK.map(({ text }, i) => (
        <li key={i} className='px-2 py-3 bg-[#CFCFCF] rounded-lg'>
          <span>{text}</span>
        </li>
      ))}
    </ul>
  )
}
