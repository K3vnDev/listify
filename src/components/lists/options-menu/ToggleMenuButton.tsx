import { ArrowDownIcon, MoreIcon } from '@/icons'
import { useContext } from 'react'
import { OptionsMenuContext } from './OptionsMenu'

export const ToggleMenuButton = () => {
  const { isShowing, setIsShowing } = useContext(OptionsMenuContext)

  const handleClick = () => {
    setIsShowing(!isShowing)
  }

  return (
    <button
      onClick={handleClick}
      title={!isShowing ? 'Options' : undefined}
      className='text-slate-600 *:size-full'
    >
      {isShowing ? <ArrowDownIcon /> : <MoreIcon />}
    </button>
  )
}
