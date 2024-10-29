import { dataFetch } from '@/utils/dataFetch'
import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

interface Params<T> {
  prevValue: T
  onError?: (prevValue: T) => void
  patch: { taskId: string; target: 'done' | 'text' } | { target: 'name' | 'color' }
}

export const usePatch = <T>({ prevValue, onError = () => {}, patch }: Params<T>) => {
  const timeout = useRef<NodeJS.Timeout>()
  const prevValueRef = useRef<T>()
  const { listId } = useParams()

  const patchType = (patch as any).taskId ? 'tasks' : 'lists'

  const trigger = (newValue: T) => {
    clearTimeout(timeout.current)
    if (prevValueRef.current === undefined) prevValueRef.current = prevValue

    timeout.current = setTimeout(async () => {
      dataFetch({
        url: `/api/${patchType}?list-id=${listId}`,
        options: {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value: newValue, ...patch })
        },
        onError: () => {
          if (prevValueRef.current !== undefined) onError(prevValueRef.current)
        },
        onSuccess: () => {
          prevValueRef.current = newValue
        }
      })
    }, 500)
  }
  useEffect(() => () => clearTimeout(timeout.current), [])

  return { trigger }
}
