import { UNSAVED_TASK_ID } from '@/consts'
import { useDeleteTask } from '@/hooks/useDeleteTask'
import { TrashIcon } from '@/icons'
import { TaskContext } from '@components/tasks/Task'
import { useContext } from 'react'

export const DeleteTaskButton = () => {
  const { taskId, text, done } = useContext(TaskContext)
  const { deleteTask } = useDeleteTask(taskId, text, done)

  return (
    <button
      onClick={deleteTask}
      className='button size-9 min-w-9 bg-red-500 rounded flex items-center justify-center border-2 border-red-600'
      disabled={taskId === UNSAVED_TASK_ID}
    >
      <TrashIcon className='text-white size-[75%]' />
    </button>
  )
}
