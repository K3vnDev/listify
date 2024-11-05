import { UNSAVED_TASK_ID } from '@/consts'
import { useDeleteTask } from '@/hooks/useDeleteTask'
import { useTasksStore } from '@/store/tasks/useTasksStore'
import type { Task } from '@/types.d'
import { dataFetch } from '@/utils/dataFetch'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export const useTask = ({ id, text, done }: Task) => {
  const { deleteTask: deleteTaskHandler } = useDeleteTask(id, text, done)
  const elementRef = useRef(null)

  // Handle editmode
  const [isEditing, setIsEditing] = useState(false)
  const editingTask = useTasksStore(s => s.editingTask)
  const setEditingTask = useTasksStore(s => s.setEditingTask)

  useEffect(() => {
    setIsEditing(editingTask === id)
  }, [editingTask])

  // Save unsaved task to store
  const isFirstRender = useRef(true)
  const deleteTaskFromStore = useTasksStore(s => s.deleteTask)
  const setTaskId = useTasksStore(s => s.setTaskId)
  const { listId } = useParams()

  useEffect(() => {
    if (id === UNSAVED_TASK_ID && isFirstRender.current) {
      isFirstRender.current = false

      dataFetch<Task[]>({
        url: `/api/tasks?list-id=${listId}`,
        options: { method: 'POST' },
        onSuccess: data => setTaskId(data[0].id, UNSAVED_TASK_ID),
        onError: () => deleteTaskFromStore(UNSAVED_TASK_ID)
      })
    }
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const clickedCheckbox = (e.target as HTMLElement).closest('input[type=checkbox]')
    if (!clickedCheckbox) setEditingTask(id)

    if (e.shiftKey && !isEditing) deleteTaskHandler()
  }

  const styles = {
    background: done && !isEditing ? '#c0c0c0' : '#cfcfcf',
    outline: isEditing ? 'border-editing' : ''
  }

  return { isEditing, elementRef, handleClick, styles }
}
