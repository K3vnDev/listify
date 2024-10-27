import { UNSAVED_TASK_ID } from '@/consts'
import { useStore } from '@/store/useStore'
import { useEffect, useState } from 'react'
import { AddButton } from '../AddButton'

export const CreateTaskButton = () => {
  const createTask = useStore(s => s.createTask)
  const tasks = useStore(s => s.tasks)
  const setEditingTask = useStore(s => s.setEditingTask)
  const [creatingTask, setCreatingTask] = useState(false)

  const handleClick = () => {
    createTask()
    setEditingTask(UNSAVED_TASK_ID)
  }

  useEffect(() => {
    const newCreatingTask = tasks?.some(task => task.id === UNSAVED_TASK_ID) ?? false
    setCreatingTask(newCreatingTask)
  }, [tasks])

  return <AddButton id='create-task-btn' onClick={handleClick} loading={creatingTask} />
}
