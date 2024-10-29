import { useTask } from '@/hooks/useTask'
import type { Task as TaskType } from '@/types.d'
import { Checkbox } from '@components/tasks/Checkbox'
import { DeleteTaskButton } from '@components/tasks/DeleteTaskButton'
import { Text } from '@components/tasks/Text'
import { createContext } from 'react'

export const Task = ({ id, text, done }: TaskType) => {
  const { isEditing, elementRef, handleClick, styles: s } = useTask({ id, text, done })

  return (
    <li
      onClick={handleClick}
      className={`
        task flex items-center justify-between pr-3 bg-[#cfcfcf] 
        ${s.background} hover:brightness-[102%] rounded-lg gap-4 ${s.outline} cursor-pointer
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
