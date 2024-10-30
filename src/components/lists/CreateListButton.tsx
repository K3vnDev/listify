import { CreateButton } from '@/components/CreateButton'
import { UNSAVED_LIST_ID } from '@/consts'
import { useListsStore } from '@/store/lists/useListsStore'

export const CreateListButton = () => {
  const lists = useListsStore(s => s.lists)
  const createUnSavedList = useListsStore(s => s.createUnSavedList)

  return (
    <CreateButton
      onClick={createUnSavedList}
      loading={lists?.some(l => l.id === UNSAVED_LIST_ID) ?? true}
    />
  )
}
