import { useEffect, useRef, useState } from 'react'

export const useDebounce = <T>(value: T, wait: number) => {
  const timeout = useRef<NodeJS.Timeout>()
  const firstTrigger = useRef(true)
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    if (firstTrigger.current) {
      firstTrigger.current = false
      return
    }

    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      setDebouncedValue(value)
    }, wait)

    return () => clearTimeout(timeout.current)
  }, [value])

  return debouncedValue
}
