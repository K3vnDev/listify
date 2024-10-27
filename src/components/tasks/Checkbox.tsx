import { usePatch } from '@/hooks/usePatch'
import { CheckIcon } from '@/icons'
import { useStore } from '@/store/useStore'
import { TaskContext } from '@components/tasks/Task'
import { useContext } from 'react'

interface Props {
  checked: boolean
}

export const Checkbox = ({ checked }: Props) => {
  const { taskId } = useContext(TaskContext)
  const setTaskDone = useStore(s => s.setTaskDone)

  const { trigger } = usePatch({
    taskId,
    prevValue: checked,
    target: 'done',
    onError: prevValue => {
      setTaskDone(prevValue, taskId)
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setTaskDone(checked, taskId)
    trigger(checked)
  }

  const outline = checked ? 'outline-[#aaa]' : 'outline-[#bbb]'

  return (
    <div
      className={`size-8 min-w-8 outline outline-4 -outline-offset-4 ${outline} rounded relative active:scale-110 transition`}
    >
      <input
        type='checkbox'
        checked={checked}
        onChange={handleChange}
        className='size-full opacity-0 cursor-pointer'
      />
      {checked && (
        <CheckIcon className='absolute size-[200%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-700 stroke-[3px] pointer-events-none' />
      )}
    </div>
  )
}
