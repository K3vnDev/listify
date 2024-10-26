import type { List } from '@/types.d'
import { create } from 'zustand'

interface Store {
  lists: List[] | null
  setLists: (value: List[]) => void
}

export const useStore = create<Store>(set => ({
  lists: null,
  setLists: value => set(() => ({ lists: value }))
}))
