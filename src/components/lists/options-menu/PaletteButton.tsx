import { ListContext } from '@/app/mylists/[listId]/page'
import { usePatch } from '@/hooks/usePatch'
import { PaletteIcon } from '@/icons'
import { useListsStore } from '@/store/lists/useListsStore'
import { getContrastingColor } from '@/utils/getContrastingColor'
import { useContext } from 'react'
import { OptionsMenuContext } from './OptionsMenu'

interface Props {
  color: string
}

export const PaletteButton = ({ color }: Props) => {
  const { isShowing } = useContext(OptionsMenuContext)
  const setListColor = useListsStore(s => s.setListColor)
  const { isBeingDeleted } = useContext(ListContext)

  const { trigger } = usePatch({
    prevValue: color,
    patch: { target: 'color' },
    onError: prevValue => {
      setListColor(prevValue)
    }
  })

  const iconColor = getContrastingColor(color)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setListColor(value)
    trigger(value)
  }

  return (
    <button
      className='button border relative'
      style={{ background: color, color: iconColor, borderColor: iconColor }}
      disabled={!isShowing || isBeingDeleted}
    >
      <PaletteIcon className='pointer-events-none' />
      <input
        type='color'
        value={color}
        className='absolute size-full top-0 left-0 opacity-0 cursor-pointer'
        onChange={handleChange}
        disabled={isBeingDeleted}
      />
    </button>
  )
}
