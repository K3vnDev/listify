import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

type Value = boolean | string

interface Params<T> {
  taskId: string
  prevValue: T
  target: 'done' | 'text'
  onError: (prevValue: T) => void
}

export const usePatch = <T>({ taskId, prevValue, target, onError }: Params<T>) => {
  const timeout = useRef<NodeJS.Timeout>()
  const prevValueRef = useRef<T>()
  const { listId } = useParams()

  const trigger = (newValue: T) => {
    clearTimeout(timeout.current)
    if (prevValueRef.current === undefined) prevValueRef.current = prevValue

    timeout.current = setTimeout(async () => {
      try {
        console.log('database call')
        const res = await fetch(`/api/tasks?list-id=${listId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ target, value: newValue, taskId })
        })
        const { success } = await res.json()
        if ((!success || !res.ok) && prevValueRef.current !== undefined) {
          onError(prevValueRef.current)
          return
        }
        prevValueRef.current = newValue
      } catch {
        if (prevValueRef.current !== undefined) onError(prevValueRef.current)
      }
    }, 500)
  }

  useEffect(() => () => clearTimeout(timeout.current), [])

  return { trigger }
}
