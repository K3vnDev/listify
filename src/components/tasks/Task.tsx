import { useTasks } from '@/hooks/useTasks'
import type { Task as TaskType } from '@/types.d'
import { Checkbox } from '@components/tasks/Checkbox'

export const Task = ({ id, text, done }: TaskType) => {
  const { setDone } = useTasks(id)

  return (
    <li className='flex items-center justify-between px-2 py-3 bg-[#CFCFCF] rounded-lg'>
      <span>{text}</span>
      <Checkbox checked={done} setChecked={setDone} />
    </li>
  )
}
