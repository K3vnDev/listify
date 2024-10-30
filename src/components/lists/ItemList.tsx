import { UNSAVED_LIST_ID } from '@/consts'
import { CheckIcon, LoadingIcon } from '@/icons'
import { useListsStore } from '@/store/lists/useListsStore'
import type { List as ListType } from '@/types.d'
import { conditionalClassName } from '@/utils/conditionalClassName'
import { dataFetch } from '@/utils/dataFetch'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

export const ItemList = ({ id, name, color }: ListType) => {
  const setSelectedList = useListsStore(s => s.setSelectedList)
  const recentlySavedList = useListsStore(s => s.recentlySavedList)
  const saveUnSavedList = useListsStore(s => s.saveUnSavedList)
  const lists = useListsStore(s => s.lists)

  const router = useRouter()
  const isFirstRender = useRef(true)

  const isDisabled = lists?.some(l => l.id === UNSAVED_LIST_ID) ?? true
  const isUnSaved = id === UNSAVED_LIST_ID

  useEffect(() => {
    if (isUnSaved && isFirstRender.current) {
      dataFetch<ListType>({
        url: '/api/lists',
        options: { method: 'POST' },
        onSuccess: ({ id, color }) => {
          saveUnSavedList(id, color)
          router.push(`/mylists/${id}`)
        }
      })
      isFirstRender.current = false
    }
  }, [])

  const handleClick = () => {
    if (isDisabled || recentlySavedList) return
    router.push(`/mylists/${id}`)
    setSelectedList({ id, name, color })
  }

  const className = conditionalClassName(
    [isDisabled && isUnSaved, 'brightness-125'],
    [isDisabled || !!recentlySavedList, 'brightness-90 opacity-75'],
    [true, 'cursor-pointer button hover:brightness-125']
  )

  return (
    <li
      onClick={handleClick}
      className={`bg-[#1A1C21] border border-[#222] p-4 pr-8 rounded-lg flex gap-4 w-fit max-w-full  items-center select-none ${className}`}
    >
      {
        //biome-ignore format: <>
        isUnSaved
          ? <LoadingIcon className='animate-spin size-6 text-white/75 [scale:1.2]' />
          : id === recentlySavedList
            ? <CheckIcon className='size-6 text-white/75 [scale:1.2]' />
            : <div className='size-6 min-w-6 rounded' style={{ background: color }} />
      }
      <span className='text-white max-w-full overflow-hidden text-ellipsis whitespace-nowrap'>
        {name}
      </span>
    </li>
  )
}
