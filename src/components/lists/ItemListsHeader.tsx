'use client'

import { fonts } from '@/consts'
import { CreateListButton } from '@components/lists/CreateListButton'
import { ToggleListsDisplayModeButton } from './ToggleListsDisplayModeButton'

export const ItemListsHeader = () => {
  return (
    <header className='flex justify-between items-center'>
      <div className='flex gap-5'>
        <span className={`font-medium text-lg ${fonts.poppins} text-white`}>My Lists</span>
        <CreateListButton />
      </div>
      <ToggleListsDisplayModeButton />
    </header>
  )
}
