import { dataFetch } from '@/utils/dataFetch'
import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

interface Params<T> {
  prevValue: T
  target: 'name' | 'color'
  onError: (prevValue: T) => void
}

export const useListPatch = <T>({ prevValue, target, onError }: Params<T>) => {
  const timeout = useRef<NodeJS.Timeout>()
  const prevValueRef = useRef<T>()
  const { listId } = useParams()

  const trigger = (newValue: T) => {
    clearTimeout(timeout.current)
    if (prevValueRef.current === undefined) prevValueRef.current = prevValue

    timeout.current = setTimeout(async () => {
      dataFetch({
        url: `/api/lists?list-id=${listId}`,
        options: {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ target, value: newValue })
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
