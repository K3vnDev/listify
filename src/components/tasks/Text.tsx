import { useStore } from '@/store/useStore'
import { getElementRef } from '@/utils/getElementRef'
import { TaskContext } from '@components/tasks/Task'
import { useContext, useEffect, useRef } from 'react'

interface Props {
  value: string
  setValue: (newValue: string) => void
}

export const Text = ({ value, setValue }: Props) => {
  const { isEditing, elementRef, done } = useContext(TaskContext)
  const setEditingTask = useStore(s => s.setEditingTask)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (isEditing) {
      const textareaElement = getElementRef<HTMLTextAreaElement>(textareaRef)
      textareaElement.focus()
      textareaElement.setSelectionRange(value.length, value.length)
    }

    const handleClick = (e: MouseEvent) => {
      if (!isEditing) return
      const target = e.target as HTMLElement

      const taskElement = getElementRef(elementRef)
      const clickedOnThisElement = taskElement.contains(target)

      const clickedOnATaskElement =
        target.closest('.task') && !target.closest('input[type=checkbox]')

      if (clickedOnThisElement) getElementRef(textareaRef).focus()
      else if (!clickedOnATaskElement) setEditingTask(null)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [elementRef.current, isEditing])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  return !isEditing ? (
    <span
      className='w-full text-black py-4 pl-3 cursor-pointer leading-[1.375rem] text-pretty'
      style={{ textDecoration: done ? 'line-through' : undefined }}
    >
      {value}
    </span>
  ) : (
    <textarea
      className='resize-none text-black w-full py-2 my-2 ml-2 pl-1 h-fit [field-sizing:content] bg-[#d9d9d9] outline outline-2 outline-zinc-400/25 rounded'
      placeholder='Type in your task...'
      value={value}
      onChange={handleChange}
      ref={textareaRef}
    />
  )
}
