import { useListsStore } from '@/store/lists/useListsStore'
import type { List as ListType } from '@/types.d'
import { useRouter } from 'next/navigation'

export const ItemList = ({ id, name, color }: ListType) => {
  const router = useRouter()
  const setSelectedList = useListsStore(s => s.setSelectedList)

  const handleClick = () => {
    router.push(`/mylists/${id}`)
    setSelectedList({ id, name, color })
  }

  return (
    <li
      onClick={handleClick}
      className='bg-[#1A1C21] border border-[#222] p-4 pr-8 rounded-lg flex gap-4 w-fit max-w-full cursor-pointer button hover:brightness-125 items-center'
    >
      <div className='size-6 min-w-6 rounded' style={{ background: color }} />
      <span className='text-white max-w-full overflow-hidden text-ellipsis whitespace-nowrap'>
        {name}
      </span>
    </li>
  )
}
