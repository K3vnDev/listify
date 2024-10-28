import type { List } from '@/types.d'

type Modifier = (newLists: List[], selectedList: List, index: number) => List[]

export const modifyLists = (lists: List[] | null, id: string, modify: Modifier) => {
  if (lists === null) return {}

  const index = lists.findIndex(list => list.id === id)
  if (index === -1) return {}

  const newLists = [...lists]
  const newList = newLists[index]

  return { lists: modify(newLists, newList, index) }
}
