import { TaskContext } from '@/context/TaskContext'
import { usePatch } from '@/hooks/usePatch'
import { useTasksStore } from '@/store/tasks/useTasksStore'
import { getElementRef } from '@/utils/getElementRef'
import { useContext, useEffect, useRef } from 'react'

interface Props {
  value: string
}

export const Text = ({ value }: Props) => {
  const { taskId, isEditing, elementRef, done } = useContext(TaskContext)
  const setEditingTask = useTasksStore(s => s.setEditingTask)
  const editingTask = useTasksStore(s => s.editingTask)
  const setTaskText = useTasksStore(s => s.setTaskText)
  const textareaRef = useRef(null)

  const { trigger } = usePatch({
    prevValue: value,
    patch: { taskId, target: 'text' },
    onError: prevValue => {
      setTaskText(prevValue, taskId)
    }
  })

  useEffect(() => {
    if (isEditing) {
      const textareaElement = getElementRef<HTMLTextAreaElement>(textareaRef)
      textareaElement.focus()
      textareaElement.setSelectionRange(value.length, value.length)
    }
  }, [isEditing])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (isEditing) {
        const taskElement = getElementRef(elementRef)
        const clickedOnThis = taskElement.contains(e.target as HTMLElement)

        if (clickedOnThis) getElementRef(textareaRef).focus()
        else if (editingTask === taskId) setEditingTask(null)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [elementRef.current, isEditing, editingTask])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setTaskText(value, taskId)
    trigger(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { key, shiftKey } = e
    if (key === 'Enter' && !shiftKey) {
      e.preventDefault()
      setEditingTask(null)
    }
  }

  const lineThrough = done ? 'line-through' : ''

  return !isEditing ? (
    <span
      className={`
        w-full text-black my-4 pl-3 cursor-pointer leading-[1.375rem] 
        min-h-[1.375rem] text-pretty ${lineThrough}
      `}
    >
      {value}
    </span>
  ) : (
    <textarea
      className={`
        resize-none text-black w-full py-2 my-2 ml-2 pl-1 h-fit [field-sizing:content] 
        bg-[#d9d9d9] outline outline-2 outline-[#DAA4A4]/50 rounded
      `}
      placeholder='Type in your task...'
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      ref={textareaRef}
    />
  )
}
