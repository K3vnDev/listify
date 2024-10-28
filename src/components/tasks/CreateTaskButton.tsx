import { UNSAVED_TASK_ID } from '@/consts'
import { useTasksStore } from '@/store/tasks/useTasksStore'
import { useEffect, useState } from 'react'
import { CreateButton } from '../CreateButton'

export const CreateTaskButton = () => {
  const createTask = useTasksStore(s => s.createTask)
  const tasks = useTasksStore(s => s.tasks)
  const setEditingTask = useTasksStore(s => s.setEditingTask)
  const [creatingTask, setCreatingTask] = useState(false)

  const handleClick = () => {
    createTask(UNSAVED_TASK_ID)
    setEditingTask(UNSAVED_TASK_ID)
  }

  useEffect(() => {
    const newCreatingTask = tasks?.some(task => task.id === UNSAVED_TASK_ID) ?? false
    setCreatingTask(newCreatingTask)
  }, [tasks])

  return <CreateButton id='create-task-btn' onClick={handleClick} loading={creatingTask} />
}
