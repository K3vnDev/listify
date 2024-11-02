import { useListsStore } from '@/store/lists/useListsStore'
import { useEffect } from 'react'

export const useRefreshStateLists = () => {
  const setLists = useListsStore(s => s.setLists)
  const lists = useListsStore(s => s.lists)
  const selectedList = useListsStore(s => s.selectedList)

  useEffect(() => {
    if (lists === null || selectedList === null) return

    const index = lists.findIndex(l => l.id === selectedList.id)
    const newLists = [...lists]

    newLists.splice(index, 1, { ...selectedList })
    setLists(newLists)
  }, [selectedList])
}
