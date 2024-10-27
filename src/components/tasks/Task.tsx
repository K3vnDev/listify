import { useDeleteTask } from '@/hooks/useDeleteTask'
import { useUnSavedTask } from '@/hooks/useUnSavedTask'
import { useStore } from '@/store/useStore'
import type { Task as TaskType } from '@/types.d'
import { Checkbox } from '@components/tasks/Checkbox'
import { DeleteTaskButton } from '@components/tasks/DeleteTaskButton'
import { Text } from '@components/tasks/Text'
import { createContext, useEffect, useRef, useState } from 'react'

export const Task = ({ id, text, done }: TaskType) => {
  const [isEditing, setIsEditing] = useState(false)
  const editingTask = useStore(s => s.editingTask)
  const setEditingTask = useStore(s => s.setEditingTask)
  useEffect(() => setIsEditing(editingTask === id), [editingTask])

  const { deleteTask } = useDeleteTask(id, text, done)
  const elementRef = useRef(null)
  useUnSavedTask(id)

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const clickedCheckbox = Boolean((e.target as HTMLElement).closest('input[type=checkbox]'))
    if (!clickedCheckbox) setEditingTask(id)

    if (e.shiftKey && !isEditing) deleteTask()
  }

  const outline = isEditing ? '-outline-offset-2 outline-dashed outline-2 outline-[#DAA4A4]' : ''
  const background = done && !isEditing ? 'bg-[#c0c0c0]' : 'bg-[#cfcfcf]'

  return (
    <li
      onClick={handleClick}
      className={`
        task flex items-center justify-between pr-3 bg-[#cfcfcf] 
        ${background} hover:brightness-[102%] rounded-lg gap-4 ${outline} cursor-pointer
      `}
      ref={elementRef}
    >
      <TaskContext.Provider value={{ taskId: id, isEditing, text, done, elementRef }}>
        <Text value={text} />
        {
          // biome-ignore format: <>
          isEditing 
            ? <DeleteTaskButton /> 
            : <Checkbox checked={done} />
        }
      </TaskContext.Provider>
    </li>
  )
}

export const TaskContext = createContext({
  ...{ taskId: '', isEditing: false, text: '', done: false },
  elementRef: { current: null } as React.MutableRefObject<null>
})