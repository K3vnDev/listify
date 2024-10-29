import { CreateButton } from '@/components/CreateButton'
import { useListsStore } from '@/store/lists/useListsStore'

export const CreateListButton = () => {
  const lists = useListsStore(s => s.lists)

  const handleClick = () => {}

  return <CreateButton onClick={handleClick} loading={lists === null} />
}
