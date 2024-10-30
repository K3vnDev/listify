import { DEFAULT_LIST_NAME, LISTS_DISPLAY_MODE_ITEM_NAME, UNSAVED_LIST_ID } from '@/consts'
import type { List, ListsDisplayMode } from '@/types.d'
import { create } from 'zustand'

interface ListsStore {
  lists: List[] | null
  setLists: (value: List[]) => void

  selectedList: List | null
  setSelectedList: (value: List | null) => void

  listsDisplayMode: ListsDisplayMode
  setListsDisplayMode: (value: ListsDisplayMode) => void

  createUnSavedList: () => void
  saveUnSavedList: (id: string, color: string) => void

  recentlySavedList: string | null
  setRecentlySavedList: (value: string | null) => void

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

  createUnSavedList: () =>
    set(({ lists }) => {
      if (lists === null) return {}
      const newList: List = {
        id: UNSAVED_LIST_ID,
        name: DEFAULT_LIST_NAME,
        color: ''
      }
      return { lists: [...lists, newList] }
    }),

  saveUnSavedList: (id, color) =>
    set(({ lists }) => {
      if (lists === null) return {}
      const newLists = [...lists]
      const index = newLists.findIndex(l => l.id === UNSAVED_LIST_ID)
      if (index === -1) return {}

      const newSavedList = { ...newLists[index], id, color }
      newLists.splice(index, 1, newSavedList)

      return {
        lists: newLists,
        selectedList: newSavedList,
        recentlySavedList: id
      }
    }),

  recentlySavedList: null,
  setRecentlySavedList: value => set(() => ({ recentlySavedList: value })),

  setListName: value =>
    set(({ selectedList }) => {
      if (selectedList === null) return {}
      const newList = { ...selectedList }
      newList.name = value
      return { selectedList: newList }
    })
}))
