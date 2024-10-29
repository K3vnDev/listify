import { useEffect } from 'react'

interface Params {
  event?: 'click' | 'pointerdown'
  selectors?: string[]
}

export const useOnClickSelector = (
  action: (value: boolean) => void,
  { event = 'click', selectors = [] }: Params
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const { target } = e
      if (!target) return
      const clickedInside = selectors.some(selector =>
        Boolean((target as HTMLElement).closest(selector))
      )
      action(clickedInside)
    }
    document.addEventListener(event, handleClick)
    return () => document.removeEventListener(event, handleClick)
  }, [action])
}
