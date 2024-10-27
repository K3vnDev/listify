import { useStore } from '@/store/useStore'
import { useParams } from 'next/navigation'

export const useTasks = (taskId: string) => {
  const setTaskDone = useStore(s => s.setTaskDone)
  const setTaskText = useStore(s => s.setTaskText)

  const { listId } = useParams()

  const setDone = async (value: boolean) => {
    const prevState = !value
    setTaskDone(value, taskId)

    const res = await fetch(`/api/tasks?list-id=${listId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target: 'done', value, taskId })
    })
    const { success } = await res.json()

    if (!success || !res.ok) {
      setTaskDone(prevState, taskId)
      // TODO: Improve error handling
    }
  }

  const setText = async (value: string) => {
    // const prevState = !value
    setTaskText(value, taskId)

    const res = await fetch(`/api/tasks?list-id=${listId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target: 'text', value, taskId })
    })
    const { success } = await res.json()

    if (!success || !res.ok) {
      setTaskText('', taskId)
      // TODO: Improve error handling
    }
  }

  const remove = () => {}
  const create = () => {}

  return { setDone, setText, remove, create }
}
