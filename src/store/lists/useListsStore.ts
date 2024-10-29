import { LISTS_DISPLAY_MODE_ITEM_NAME } from '@/consts'
import type { List, ListsDisplayMode } from '@/types.d'
import { create } from 'zustand'

interface ListsStore {
  lists: List[] | null
  setLists: (value: List[]) => void

  selectedList: List | null
  setSelectedList: (value: List | null) => void

  listsDisplayMode: ListsDisplayMode
  setListsDisplayMode: (value: ListsDisplayMode) => void

  setListName: (value: string) => void
}

export const useListsStore = create<ListsStore>(set => ({
  lists: null,
  setLists: value => set(() => ({ lists: value })),

  listsDisplayMode: (() => {
    const value = window.localStorage.getItem(LISTS_DISPLAY_MODE_ITEM_NAME)
    return value === 'list' || value === 'grid' ? value : 'grid'
  })(),
  setListsDisplayMode: value => set(() => ({ listsDisplayMode: value })),

  selectedList: null,
  setSelectedList: value => set(() => ({ selectedList: value })),

  setListName: value =>
    set(({ selectedList }) => {
      if (selectedList === null) return {}
      const newList = { ...selectedList }
      newList.name = value
      return { selectedList: newList }
    })
}))
