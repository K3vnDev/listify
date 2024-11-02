import { ListContext } from '@/app/mylists/[listId]/page'
import { UNSAVED_TASK_ID } from '@/consts'
import { useTasksStore } from '@/store/tasks/useTasksStore'
import { useContext, useEffect, useState } from 'react'
import { CreateButton } from '../CreateButton'

export const CreateTaskButton = () => {
  const createTask = useTasksStore(s => s.createTask)
  const tasks = useTasksStore(s => s.tasks)
  const setEditingTask = useTasksStore(s => s.setEditingTask)
  const [isCreatingTask, setIsCreatingTask] = useState(false)
  const { isBeingDeleted } = useContext(ListContext)

  const handleClick = () => {
    createTask(UNSAVED_TASK_ID)
    setEditingTask(UNSAVED_TASK_ID)
  }

  useEffect(() => {
    const newIsCreatingTask = tasks?.some(task => task.id === UNSAVED_TASK_ID) ?? false
    setIsCreatingTask(newIsCreatingTask)
  }, [tasks])

  return (
    <CreateButton
      id='create-task-btn'
      loading={isCreatingTask || tasks === null || isBeingDeleted}
      onClick={handleClick}
    />
  )
}
