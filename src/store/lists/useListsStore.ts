import type { List } from '@/types.d'
import { create } from 'zustand'

interface ListsStore {
  lists: List[] | null
  setLists: (value: List[]) => void

  selectedList: List | null
  setSelectedList: (value: List) => void

  setListName: (value: string) => void
}

export const useListsStore = create<ListsStore>(set => ({
  lists: null,
  setLists: value => set(() => ({ lists: value })),

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
