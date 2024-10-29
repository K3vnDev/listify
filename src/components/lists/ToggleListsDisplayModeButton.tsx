import { LISTS_DISPLAY_MODE_ITEM_NAME } from '@/consts'
import { GridIcon, ListIcon } from '@/icons'
import { useListsStore } from '@/store/lists/useListsStore'

export const ToggleListsDisplayModeButton = () => {
  const listsDisplayMode = useListsStore(s => s.listsDisplayMode)
  const setListsDisplayMode = useListsStore(s => s.setListsDisplayMode)

  const handleClick = () => {
    const newValue = listsDisplayMode === 'grid' ? 'list' : 'grid'
    setListsDisplayMode(newValue)
    window.localStorage.setItem(LISTS_DISPLAY_MODE_ITEM_NAME, newValue)
  }

  const className = 'size-full text-gray-500'

  // biome-ignore format: <>
  return (
    <button 
      onClick={handleClick}
      className='button size-8'
    >{
      listsDisplayMode === 'list' 
        ? <GridIcon { ...{ className }} />
        : <ListIcon { ...{ className }} />
    }</button>
  )
}
