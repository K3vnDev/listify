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
      try {
        const res = await fetch(`/api/lists?list-id=${listId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ target, value: newValue })
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
