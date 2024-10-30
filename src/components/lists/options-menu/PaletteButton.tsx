import { PaletteIcon } from '@/icons'
import { useContext } from 'react'
import { OptionsMenuContext } from './OptionsMenu'

export const PaletteButton = () => {
  const { isShowing } = useContext(OptionsMenuContext)

  return (
    <button className='bg-zinc-600 button' disabled={!isShowing}>
      <PaletteIcon />
    </button>
  )
}
