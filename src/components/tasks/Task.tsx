import { TaskContext } from '@/context/TaskContext'
import { useTask } from '@/hooks/useTask'
import type { Task as TaskType } from '@/types.d'
import { Checkbox } from '@components/tasks/Checkbox'
import { DeleteTaskButton } from '@components/tasks/DeleteTaskButton'
import { Text } from '@components/tasks/Text'

export const Task = ({ id, text, done }: TaskType) => {
  const {
    isEditing,
    handleClick,
    elementRef,
    styles: { outline, background }
  } = useTask({ id, text, done })

  return (
    <li
      onClick={handleClick}
      className={`
        task flex items-center justify-between pr-3 hover:brightness-[102%] 
        rounded-lg gap-4 ${outline} cursor-pointer
      `}
      style={{ background }}
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
