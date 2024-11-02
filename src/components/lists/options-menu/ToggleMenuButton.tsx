import { OptionsMenuContext } from '@/context/OptionsMenuContext'
import { ArrowDownIcon, MoreIcon } from '@/icons'
import { useListsStore } from '@/store/lists/useListsStore'
import { useContext } from 'react'

export const ToggleMenuButton = () => {
  const { isShowing, setIsShowing } = useContext(OptionsMenuContext)
  const selectedLists = useListsStore(s => s.selectedList)

  const handleClick = () => {
    setIsShowing(!isShowing)
  }

  return (
    <button
      onClick={handleClick}
      title={!isShowing ? 'Options' : undefined}
      className='text-slate-600 *:size-full disabled:opacity-50'
      disabled={selectedLists === null}
    >
      {isShowing ? <ArrowDownIcon /> : <MoreIcon />}
    </button>
  )
}
