import { UNSAVED_TASK_ID } from '@/consts'
import { useStore } from '@/store/useStore'
import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export const useUnSavedTask = (taskId: string) => {
  const setTaskId = useStore(s => s.setTaskId)
  const deleteTask = useStore(s => s.deleteTask)
  const { listId } = useParams()
  const isFirstRender = useRef(true)

  const saveUnsavedTask = async () => {
    try {
      const res = await fetch(`/api/tasks?list-id=${listId}`, { method: 'POST' })
      const { success, data } = await res.json()

      if (!success || !res.ok) {
        deleteTask(UNSAVED_TASK_ID)
        return
      }
      const [{ id }] = data
      setTaskId(id, UNSAVED_TASK_ID)
    } catch {
      deleteTask(UNSAVED_TASK_ID)
    }
  }

  useEffect(() => {
    if (taskId === UNSAVED_TASK_ID && isFirstRender.current) {
      isFirstRender.current = false
      saveUnsavedTask()
    }
  }, [])
}