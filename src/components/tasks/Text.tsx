import { useTaskPatch } from '@/hooks/useTaskPatch'
import { useStore } from '@/store/useStore'
import { getElementRef } from '@/utils/getElementRef'
import { TaskContext } from '@components/tasks/Task'
import { useContext, useEffect, useRef } from 'react'

interface Props {
  value: string
}

export const Text = ({ value }: Props) => {
  const { taskId, isEditing, elementRef, done } = useContext(TaskContext)
  const setEditingTask = useStore(s => s.setEditingTask)
  const setTaskText = useStore(s => s.setTaskText)
  const textareaRef = useRef(null)

  const { trigger } = useTaskPatch({
    taskId,
    prevValue: value,
    target: 'text',
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

    const handleClick = (e: MouseEvent) => {
      if (!isEditing) return
      const target = e.target as HTMLElement

      const taskElement = getElementRef(elementRef)

      const clickedOn = {
        thisTask: taskElement.contains(target),
        anotherTask: !!target.closest('.task'),
        taskCheckbox: !!target.closest('.task input[type=checkbox]'),
        createTaskButton: !!target.closest('#create-task-btn')
      }

      if (clickedOn.thisTask) {
        getElementRef(textareaRef).focus()
        return
      }

      if ((!clickedOn.anotherTask && !clickedOn.createTaskButton) || clickedOn.taskCheckbox)
        setEditingTask(null)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [elementRef.current, isEditing])

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
