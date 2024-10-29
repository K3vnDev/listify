import { UNSAVED_TASK_ID } from '@/consts'
import { useTasksStore } from '@/store/tasks/useTasksStore'
import { dataFetch } from '@/utils/dataFetch'
import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export const useUnSavedTask = (taskId: string) => {
  const setTaskId = useTasksStore(s => s.setTaskId)
  const deleteTask = useTasksStore(s => s.deleteTask)
  const { listId } = useParams()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (taskId === UNSAVED_TASK_ID && isFirstRender.current) {
      isFirstRender.current = false

      // Create new task and set its id to unsaved task
      dataFetch({
        url: `/api/tasks?list-id=${listId}`,
        options: { method: 'POST' },
        onSuccess: data => setTaskId(data[0].id, UNSAVED_TASK_ID),
        onError: () => deleteTask(UNSAVED_TASK_ID)
      })
    }
  }, [])
}
