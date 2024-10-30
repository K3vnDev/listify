import { TrashIcon } from '@/icons'
import { useContext } from 'react'
import { OptionsMenuContext } from './OptionsMenu'

export const DeleteButton = () => {
  const { isShowing } = useContext(OptionsMenuContext)

  return (
    <button className='bg-zinc-800 button' disabled={!isShowing}>
      <TrashIcon />
    </button>
  )
}
